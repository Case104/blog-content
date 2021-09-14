import React, { Component } from 'react';

export default class Example extends Component {
    constructor() {
        super();
        this.handleMqlChange = this.handleMqlChange.bind(this)
        this.queryDict = {
            '(min-width: 1000px)': {
                name: 'big',
                mql: null
            },
            '(max-width: 999px) and (min-width: 700px)': {
                name: 'medium',
                mql: null
            },
            '(max-width: 699px)': {
                name: 'small',
                mql: null
            }
        }

        for (const [key, { name } ] of Object.entries(this.queryDict)) {
            let mql = window.matchMedia(key)
            this.queryDict[key].mql = mql
            if (mql.matches) this.state = { currentSize: name }
        }
    }

    handleMqlChange = (mql) => {
        if (mql.matches) this.setState({currentSize: this.queryDict[mql.media].name})
    }

    componentDidMount() {
        for (const query in this.queryDict) {
            this.queryDict[query].mql.addEventListener('change', this.handleMqlChange);
        }
    }

    componentWillUnmount() {
        for (const query in this.queryDict) {
            this.queryDict[query].mql.removeEventListener('change', this.handleMqlChange);
        }
    }

    render() {
        return (
            <>
                {this.state.currentSize === 'big' && <div>BIG CONTENT</div>}
                {this.state.currentSize === 'medium' && <div>Medium Content</div>}
                {this.state.currentSize === 'small' && <div>small content</div>}
            </>
        );
    }
}
