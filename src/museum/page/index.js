import React from 'react';
import {getList} from '../api/index';
export class Museum extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount() {
        console.log(getList().then(data=>{debugger}));
    }

    render() {
        const{hello}=this.props;
        return (
            <div className="App">
                <header className="App-header">
                    {hello}
                </header>
            </div>
        );
    }


}

export default Museum;
