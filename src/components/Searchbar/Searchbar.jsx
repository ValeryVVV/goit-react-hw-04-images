import PropTypes from 'prop-types'; 

import style  from "./Searchbar.module.css";
import { useState } from 'react';

export default function Searchbar({onSubmit}) {

    const [query, setQuery] = useState('');

    const handleInputChange = e => {
        setQuery(e.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();

        if(query.trim() === '') {
            alert('Please enter your search query name !');
            return;
        }
        onSubmit(query);
        setQuery({ query: '' });
    };

    return (
        <header className={style.searchbar}>
            <form onSubmit={handleSubmit} className={style.form}>
                <input
                    className={style.searchForm_input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={handleInputChange}
                />
                <button type='submit' className={style.searchForm_button}>
                    Search
                </button>
            </form>
        </header>

    )
}


// export default class Searchbar extends Component {
//     state = {
//         query: '',
//     };

//     handleInputChange = e => {
//         this.setState({ query: e.currentTarget.value.toLowerCase() });
//     };

//     handleSubmit = event => {
//         event.preventDefault();

//         if(this.state.query.trim() === '') {
//             alert('Please enter your search query name !');
//             return;
//         }
//         this.props.onSubmit(this.state.query);
//         this.setState({ query: '' });
//     };

//     render() {
//         return (
//             <header className={style.searchbar}>
//                 <form onSubmit={this.handleSubmit} className={style.form}>
//                     <input
//                         className={style.searchForm_input}
//                         type="text"
//                         autoComplete="off"
//                         autoFocus
//                         placeholder="Search images and photos"
//                         onChange={this.handleInputChange}
//                     />
//                     <button type='submit' className={style.searchForm_button}>
//                         Search
//                     </button>
//                 </form>
//             </header>
        
//         )
//     }
// }

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
