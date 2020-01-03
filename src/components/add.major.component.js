// import React, { Component } from 'react';


// class Chkboxlist extends Component {
//     constructor(props) {
//         super(props) 
//         this.state = {}
//         props.values.map((v, i) => {
//             this.state[v] = false
//         })
//     }
  
//     onChange(key, value) {
//         this.setState({ [key]: value }, (state) => {
//             this.props.onChange(this.state)
//         })
//     }
  
//     render() {
//         return (
//             <div className="list-group-item form-group">
//                   {this.props.values.map((value, i) => (
//                       <div className="checkbox" key={i}>
//                           <label>
//                               <input 
//                                   onChange={(e) => this.onChange(value, e.target.checked)} 
//                                   type='checkbox' 
//                                   value={this.state[value]}
//                               />
//                               {value}
//                           </label>
//                       </div>
//                   ))}
//             </div>
//         )
//     }
//   }
  
//   export default class AddMajor extends Component {
  
//     constructor(props) {
//         super(props)
//         this.state = {}
//     }
  
//     onChange(name, values) {
//         this.setState({ [name]: values })
//     }
  
//     render() {
//       const languages = ["English", "German", "French", "Spanish", "Mandarin", "Tamil"]
  
  
//       return (
//           <div className="container">
//               <div className="row">
//                 <form className="form">
  
//                   <div className="list-group col-xs-6">
//                       <h4>Can Speak</h4> 
//                       <Chkboxlist 
//                           onChange={(values) => this.onChange('speak', values)}
//                           values={languages}
//                       />
//                   </div>
  
//                   <div className="list-group col-xs-6">
//                       <h4>Can Read</h4> 
//                       <Chkboxlist 
//                           onChange={(values) => this.onChange('read', values)}
//                           values={languages}
//                       />
//                   </div>
  
//                   <div className="list-group col-xs-6">
//                       <h4>Can Write</h4> 
//                       <Chkboxlist 
//                           onChange={(values) => this.onChange('write', values)}
//                           values={languages}
//                       />
//                   </div>
  
//                   <div className="list-group col-xs-6">
//                       <h4>Can Understand</h4> 
//                       <Chkboxlist 
//                           onChange={(values) => this.onChange('understand', values)}
//                           values={languages}
//                       />
//                   </div>
  
//                   <button
//                     className="btn btn-primary"
//                     onClick={(e) => {
//                       console.log(this.state);
//                       e.preventDefault();
//                     }}
//                   >
//                     Save
//                   </button>
//                 </form>
//             </div>
//         </div>
//       );
//     }
//   }