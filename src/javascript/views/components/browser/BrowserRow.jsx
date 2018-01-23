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
 * Browser Row
 *
 * @Date : 2018-01-21
 * @Description : Trace Browser Row.
 **/

import Zipkin from '../../../util/Zipkin';
import Moment from 'moment';
import React from 'react';

const BrowserRow = ({
    onDeleteLocalTraceClick,
    onTraceClick,
    traceWidth,
    isDeleted,
    canDelete,
    trace,
    intl
}) => (
    <div
        onClick={e => onTraceClick(e, trace)}
        className={`zk-ui-browser-card-cell ${isDeleted ? 'loading' : ''}`}>
        <div className="zk-ui-browser-card-cell-container">
            { isDeleted && (<div className="zk-ui-loader"></div>) }
            <table>
                <tbody>
                    <tr>
                        <td className="zk-ui-browser-card-cell-span-name">
                            <span>
                                { Zipkin.GetTraceService(trace) }
                            </span>
                            <span className="zk-ui-trace-name">
                                { Zipkin.GetTraceName(trace) }
                            </span>
                            <div className="zk-ui-browser-card-cell-num-spans">
                                {
                                    intl.formatMessage({
                                        id: 'span_count'
                                    }, {
                                        count: intl.formatNumber(
                                            Zipkin.GetTraceSpanCount(trace)
                                        )
                                    })
                                }
                            </div>
                            {
                                trace.upload_date && (
                                    <div className="zk-ui-browser-card-cell-upload-date">
                                        {
                                            intl.formatMessage({
                                                id: 'upload_date'
                                            }, {
                                                date: Moment.unix(trace.upload_date).fromNow()
                                            })
                                        }
                                    </div>
                                )
                            }
                        </td>
                        <td className="zk-ui-browser-card-cell-span-info">
                            <div className="zk-ui-browser-card-cell-span-width-container">
                                <div
                                    style={{width: traceWidth}}
                                    className="zk-ui-browser-card-cell-span-width" />
                            </div>
                            <div className="zk-ui-browser-card-cell-span-duration">
                                { Zipkin.DurationToString(Zipkin.GetTraceDuration(trace), intl) }
                            </div>
                            <div className="zk-ui-browser-card-cell-span-date">
                                { Zipkin.GetTraceDate(trace) }
                            </div>
                        </td>
                        {
                            canDelete && (
                                <td
                                    className="zk-ui-browser-card-cell-delete"
                                    onClick={e => onDeleteLocalTraceClick(e, trace)}>
                                    <div className="zk-ui-browser-card-cell-delete">
                                        <i className="fa fa-trash"></i>
                                    </div>
                                </td>
                            )
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

export default BrowserRow;
