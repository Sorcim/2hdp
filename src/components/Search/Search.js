import React from 'react';
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {searchAction} from "./SearchAction";

const mapStateToProps = (state, ownProps) => {
  return {
    search:state.search
  };
};

const mapDispatchToProps = {
  searchAction
};

const SearchComponent = ({search, searchAction}) => {
  const [input, setInput] = React.useState(search);
  const history = useHistory();
  function onInputChange(event){
    setInput(event.target.value);
  }

  const onInputSubmit = e =>{
    if (e.keyCode === 13){
      history.push(`/search/${input}`)
      searchAction(input)
    }
  }

  return <div className="relative mt-3 md:mt-0">
    <input type="text" className="bg-gray-800 text-sm rounded-full w-64 px-4 pl-8 py-1 focus:outline-none focus:shadow-outline" placeholder="Search" onChange={event => {onInputChange(event)}}
           onKeyDown={event => {onInputSubmit(event)}}
           value={input}/>
  </div>
};

const Search = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);

export default Search;
