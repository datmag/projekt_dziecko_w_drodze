// import React, { Component } from 'react';
// import './SearchBar.scss';

// class SearchBar extends Component {
    
//     render (){
//         return (
//             <div className='container'>
//                 <div className='page-search-bar'>
//                     <form className='page-search-bar-form'>
//                         <h1>Podaj datę ostatniej miesiączki</h1>
//                             <input value={this.props.day} onChange={this.props.changeDay} type="text" placeholder="Dzień" id='day'/>
//                             <input value={this.props.month} onChange={this.props.changeMonth} type="text" placeholder="Miesiąc" id='month'/>
//                             <input value={this.props.year} onChange={this.props.changeYear} type="text" placeholder="Rok" id='year'/>
//                             <input type="submit" value='Potwierdź' onClick={this.props.sendMessage} id='submit'/>

//                             <p style={{color: "red"}}>{this.props.warning}</p>
//                     </form>
//                 </div>
//             </div>
//         );
//     }
// }

// export default SearchBar;