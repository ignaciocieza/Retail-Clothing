import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { searchValue, toggleMenuHiddenToTrue } from '../../../api/actions/indexActions';
import {selectCartHidden} from "../../../api/reducers/helperFunctions";
import { createStructuredSelector } from 'reselect';
import "./searchBar.styles.scss";

const SearchBar = ({ searchValue, history, hidden, toggleMenuHiddenToTrue }) => {
    return (
        <div className={hidden ? "content": "contenteTwo"}>
            <div className="search">
                <input
                    type="text"
                    className="search__input"
                    aria-label="search"
                    placeholder="enter your search..."
                    onKeyPress={(e) => {
                        if (e.which === 13) { //significa key= "enter"
                            searchValue(e.target.value.substr(0, 20));
                            history.push('/search');
                            toggleMenuHiddenToTrue();
                        }
                    }}
                />
                <button className="search__submit" aria-label="submit search"><SearchIcon className='search__icon' /></button>
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    hidden: selectCartHidden
});

const mapDispatchToProps = (dispatch) => ({
    searchValue: bindActionCreators(searchValue, dispatch),
    toggleMenuHiddenToTrue: bindActionCreators(toggleMenuHiddenToTrue,dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar)); 