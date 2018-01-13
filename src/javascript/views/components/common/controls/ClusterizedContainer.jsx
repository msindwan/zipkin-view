/**
 * Copyright 2017 Mayank Sindwani
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * ClusterizedContainer
 *
 *      This is a fork of https://github.com/trendmicro-frontend/react-clusterize
 *      Licensed under the MIT License https://opensource.org/licenses/MIT
 *
 * @Date : 2017-12-13
 * @Description : Defines a wrapper component for clusterize.js.
 **/

import ReactDOMServer from 'react-dom/server';
import ClusterizeJS from 'clusterize.js';
import PropTypes from 'prop-types';
import React from 'react';

class ClusterizedContainer extends React.Component {

    constructor(props) {
        super(props);
        this.contentElem = null;
        this.clusterize = null;
        this.rowClass = `clusterized-container-row-${Math.random()}`;
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        const clusterizeOptions = {
            rows: this.rowsToStrings(this.props.children),
            contentElem: this.contentElem
        };
        if (typeof this.props.tag !== 'undefined') {
            clusterizeOptions.tag = this.props.tag;
        }
        if (typeof this.props.show_no_data_row !== 'undefined') {
            clusterizeOptions.show_no_data_row = this.props.show_no_data_row;
        }
        if (typeof this.props.rows_in_block !== 'undefined') {
            clusterizeOptions.rows_in_block = this.props.rows_in_block;
        }
        if (typeof this.props.blocks_in_cluster !== 'undefined') {
            clusterizeOptions.blocks_in_cluster = this.props.blocks_in_cluster;
        }
        if (typeof this.props.no_data_text !== 'undefined') {
            clusterizeOptions.no_data_text = this.props.no_data_text;
        }
        if (typeof this.props.no_data_class !== 'undefined') {
            clusterizeOptions.no_data_class = this.props.no_data_class;
        }
        if (typeof this.props.keep_parity !== 'undefined') {
            clusterizeOptions.keep_parity = this.props.keep_parity;
        }
        if (typeof this.props.scrollId !== 'undefined') {
            clusterizeOptions.scrollId = this.props.scrollId;
        }
        this.clusterize = new ClusterizeJS(clusterizeOptions);
    }

    componentWillUnmount() {
        if (this.clusterize) {
            this.clusterize.destroy(true);
            this.clusterize = null;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.clusterize !== null) {
            if (nextProps.children.length === 0) {
                this.clusterize.clear();
            } else if (nextProps.children !== this.props.children) {
                this.clusterize.update(this.rowsToStrings(nextProps.children));
            }
        }
    }

    /**
     * Rows To Strings
     *
     * Description: Converts the child row elements to strings.
     * @param rows {array} // The rows to convert.
     * @returns {array} // The same rows as strings.
     */
    rowsToStrings(rows) {
        return rows.map(row => {
            const clone = React.cloneElement(row, {
                className: `${row.props.className} ${this.rowClass}`
            });
            return ReactDOMServer.renderToString(clone);
        });
    }

    /**
     * On Click
     *
     * Description: Handles click events for the container and finds the closest row.
     * @param e {event}  // The event object.
     */
    onClick(e) {
        let elem = e.target;
        while (!elem.classList.contains(this.rowClass)) {
            elem = elem.parentNode;
        }
        this.props.onRowClick(e, elem);
    }

    render() {
        const Container = this.props.container;
        return (
            <Container
                className={this.props.className}
                style={this.props.style}
                onClick={e => this.onClick(e)}
                ref={node => { this.contentElem = node; }}
            />
        );
    }
}

ClusterizedContainer.defaultProps = {
    style: { outline: 'none' },
    onRowClick: () => {},
    container: 'div',
    children: []
};

ClusterizedContainer.propTypes = {
    tag: PropTypes.string,
    show_no_data_row: PropTypes.bool,
    rows_in_block: PropTypes.number,
    blocks_in_cluster: PropTypes.number,
    no_data_text: PropTypes.string,
    no_data_class: PropTypes.string,
    keep_parity: PropTypes.bool,
    children: PropTypes.array.isRequired,
    scrollId: PropTypes.string.isRequired,
    style: PropTypes.object,
    onRowClick: PropTypes.func,
    container: PropTypes.string
};

export default ClusterizedContainer;
