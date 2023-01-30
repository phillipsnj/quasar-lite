import { reactive } from "vue";

const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const cbusLib = require("cbuslibrary");

const con_info = {};
con_info["path"] = "/dev/tty.usbmodem1101";
con_info["baudRate"] = 115200;
con_info["dataBits"] = 8;
con_info["parity"] = "none";
con_info["stopBits"] = 1;


SerialPort.list().then(ports => {
  ports.forEach(function(port) {
    if (port.vendorId != undefined && port.vendorId.toString().toUpperCase() == "04D8" && port.productId.toString().toUpperCase() == "F80C") {
      con_info["path"] = port.path;
      console.log(`Found Port ${con_info["path"]}`);
    }
  });
});

const state = reactive({
  com_port: con_info["path"],
  debug: false,
  display_component: "HomePage",
  event_component: '',
  selected_node: 0,
  selected_event_index: 0,
  nodes: {},
  events: {},
  messages: [],
  colours: ["black", "red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow", "amber", "orange", "deep-orange", "brown", "blue-grey", "grey"]
});

const methods = {
  update_display_component(component) {
    console.log(`Display Component ${component}`)
    state.display_component = component;
  },
  remove_node(nodeNumber) {
    delete state.nodes[nodeNumber]
  },
  send_output(output){
    console.log(`${output["mnemonic"]} : ${JSON.stringify(cbusLib.encode(output))}`)
    state.messages.push(`${output["mnemonic"]}: ${JSON.stringify(cbusLib.encode(output))}`)
    serialPort.write(JSON.stringify(cbusLib.encode(output)))
  },
  QNN() {
    let output = {};
    output["mnemonic"] = "QNN";
    methods.send_output(output)
/*    console.log(`QNN : ${JSON.stringify(cbusLib.encode(output))}`)
    state.messages.push(`QNN : ${JSON.stringify(cbusLib.encode(output))}`)
    serialPort.write(JSON.stringify(cbusLib.encode(output)))*/
    for (let node in state.nodes) {
      state.nodes[node]['status'] = false
    }
  },
  clear_events(){
    state.events = {}
  },
  clear_messages(){
    state.messages = []
  },
  request_node_parameters(node_id){
    const delay = 10
    for (let i=0; i <= 20; i++ ){
      setTimeout(function() {methods.RQNPN(node_id, i)}, i*delay)
    }
  },
  request_node_variables(node_id){
    const delay = 10
    const variableCount = state.nodes[node_id]["parameters"][6]
    for (let i=0; i <= variableCount; i++ ){
      setTimeout(function() {methods.NVRD(node_id, i)}, i*delay)
    }
  },
  update_node_variable(node_id, variable_id, new_value){
    let output = {}
    output['mnemonic'] = 'NVSET'
    output['nodeNumber'] = node_id
    output['nodeVariableIndex'] = variable_id
    output['nodeVariableValue'] = new_value
    methods.send_output(output)
    output = {}
    output['mnemonic'] = 'NVRD'
    output['nodeNumber'] = node_id
    output['nodeVariableIndex'] = variable_id
    methods.send_output(output)
  },
  update_event_variable(node_id, event_identifier, event_index, variable_id, new_value){
    let output = {}
    output['mnemonic'] = 'NNLRN'
    output['nodeNumber'] = node_id
    methods.send_output(output)
    output = {}
    output['mnemonic'] = 'EVLRN'
    output['nodeNumber'] = parseInt(event_identifier.substr(0, 4), 16)
    output['eventNumber'] = parseInt(event_identifier.substr(4, 4), 16)
    output['eventVariableIndex'] = variable_id
    output['eventVariableValue'] = new_value
    methods.send_output(output)
    output = {}
    output['mnemonic'] = 'NNULN'
    output['nodeNumber'] = node_id
    methods.send_output(output)
    output = {}
    output['mnemonic'] = 'REVAL'
    output['nodeNumber'] = node_id
    output['eventIndex'] = event_index
    output['eventVariableIndex'] = variable_id
    methods.send_output(output)
  },
  request_node_events(node_id){
    let output = {}
    output['mnemonic'] = 'NERD'
    output['nodeNumber'] = node_id
    methods.send_output(output)
  },
  request_all_event_variables(node_id, event_index){
    const delay = 10
    const variableCount = state.nodes[node_id]["parameters"][5]
    for (let i=0; i <= variableCount; i++ ){
      setTimeout(function() {methods.REVAL(node_id, event_index, i)}, i*delay)
    }
  },
  RQNPN(node_id, parameter_id) {
    let output = {}
    output['mnemonic'] = 'RQNPN'
    output['nodeNumber'] = node_id
    output['parameterIndex'] = parameter_id
    methods.send_output(output)
  },
  RQSD(node_id, service) {
    let output = {}
    output['mnemonic'] = 'RQSD'
    output['nodeNumber'] = node_id
    output['ServiceIndex'] = service
    methods.send_output(output)
  },
  REVAL(node_id, event_id, variable_id) {
    let output = {}
    output['mnemonic'] = 'REVAL'
    output['nodeNumber'] = node_id
    output['eventIndex'] = event_id
    output['eventVariableIndex'] = variable_id
    methods.send_output(output)
  },
  NVRD(node_id, variable_id){
    let output = {}
    output['mnemonic'] = 'NVRD'
    output['nodeNumber'] = node_id
    output['nodeVariableIndex'] = variable_id
    methods.send_output(output)
  },
  MODE(node_id, mode) {
    let output = {}
    output['mnemonic'] = 'MODE'
    output['nodeNumber'] = node_id
    output['ModeNumber'] = mode
    methods.send_output(output)
  }
}

const getters = {};

/*const serialPort = new SerialPort({
    path: '/dev/tty.usbmodem1401',
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1
})*/

const serialPort = new SerialPort(con_info);

//const parser = new parsers.Readline({
const parser = new ReadlineParser({
  delimiter: ";"
});

serialPort.pipe(parser);

serialPort.on("open", function() {
  console.log(`Serial Port On ${con_info["path"]}`);
});

parser.on("data", function(data) {
  console.log(`Message ${JSON.stringify(cbusLib.decode(data.toString()))}`);
  const msg = cbusLib.decode(data.toString());
  let output = {}
  switch (msg["mnemonic"]) {
    case "ACON":
      console.log(`ACON: ${msg["text"]}`)
      output = {}
      output['nodeNumber'] = msg['nodeNumber']
      output['eventNumber'] = msg['eventNumber']
      output['eventIdentifier'] = msg['eventIdentifier']
      output['eventData'] = msg['eventDate']
      output['status'] = 'on'
      state['events'][msg['eventIdentifier']] = output
      break
    case "ACOF":
      console.log(`ACOF: ${msg["text"]}`)
      output = {}
      output['nodeNumber'] = msg['nodeNumber']
      output['eventNumber'] = msg['eventNumber']
      output['eventIdentifier'] = msg['eventIdentifier']
      output['eventData'] = msg['eventDate']
      output['status'] = 'off'
      state['events'][msg['eventIdentifier']] = output
      break
    case "PNN":
      console.log(`PNN : ${msg["text"]}`)
      if (msg["nodeNumber"] in state.nodes) {
        console.log(`node ${msg["nodeNumber"]} exists`)
        state.nodes[msg["nodeNumber"]]['status']= true
        state.nodes[msg["nodeNumber"]]['flags'] = msg["flags"]
      } else {
        output = {}
        output["nodeNumber"] = msg["nodeNumber"]
        output["moduleIdentifier"] = msg["encoded"].substring(13, 17).toUpperCase()
        output["flags"] = msg["flags"]
        output["status"] = true
        output["variables"] = []
        output["parameters"] = []
        output["services"] = {}
        output["events"] = {}
        state.nodes[msg["nodeNumber"]] = output
        console.log(`node ${msg["nodeNumber"]} ${output["moduleIdentifier"]} not exists`)
      }
      methods.RQSD(msg['nodeNumber'],0)
      methods.MODE(msg['nodeNumber'], 7)
      break
    case "PARAN":
      console.log(`PARAN : ${msg["text"]}`)
      state.nodes[msg["nodeNumber"]]["parameters"][msg['parameterIndex']] = msg['parameterValue'];
      break
    case "NVANS":
      console.log(`NVANS : ${msg["text"]}`)
      state.nodes[msg["nodeNumber"]]["variables"][msg['nodeVariableIndex']] = msg['nodeVariableValue'];
      break
    case "ENRSP":
      console.log(`ENRSP : ${msg["text"]}`)
      output = {}
      output['eventIdentifier'] = msg['eventIdentifier']
      output['eventIndex'] = msg['eventIndex']
      output['variables'] = []
      state.nodes[msg["nodeNumber"]]["events"][msg['eventIndex']] = output;
      break
    case "NEVAL":
      console.log(`NEVAL : ${msg["text"]} `)
      state.nodes[msg["nodeNumber"]]["events"][msg['eventIndex']]['variables'][msg['eventVariableIndex']] = msg['eventVariableValue'];
      break
    case "SD":
      console.log(`SD : ${msg['text']}`)
      output = {}
      output["ServiceIndex"] = msg["ServiceIndex"]
      output["ServiceType"] = msg["ServiceType"]
      output["ServiceVersion"] = msg["ServiceVersion"]
      state.nodes[msg["nodeNumber"]]["services"][msg["ServiceIndex"]] = output
      break
    default:
      console.log(`UNKNOWN : ${msg["text"]}`)
  }
  state.messages.push(`${msg["text"]}`)
  //console.log(`${cbusLib.decode(data.toString())['text']}`)
});

serialPort.on("error", function(err) {
  console.log(`serial Port Error : ${err.message}`);
  //winston.error({message: `Serial port ERROR:  : ${err.message}`})
});

console.log(`USB Port ${con_info["path"]}`);

export default {
  state,
  methods,
  getters
};
