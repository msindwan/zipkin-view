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
 * Trace Span Context Table
 *
 * @Date : 2018-01-21
 * @Description : Context table for a span.
 **/

import Zipkin from '../../../util/Zipkin';
import React from 'react';

const TraceSpanRow = ({
    numHeaders,
    traceId,
    startTs,
    span,
    intl,
}) => {
    return (
        <tr className="zk-ui-trace-span-context-row" key={'selected-span'}>
            <td colSpan={numHeaders}>
                <div className="zk-ui-trace-span-context">
                    <div className="zk-ui-trace-span-name">
                        { `${Zipkin.GetSpanService(span)}.${span.name} : ${Zipkin.DurationToString(span.duration, intl)}` }
                    </div>
                    <table className="zk-ui-trace-span-context-table">
                        <tbody>
                            <tr>
                                <td className="header">
                                    { intl.formatMessage({ id: "timestamp_label" }) }
                                </td>
                                <td className="header">
                                    { intl.formatMessage({ id: "trace_id_label" }) }
                                </td>
                                <td className="header">
                                    { intl.formatMessage({ id: "span_id_label" }) }
                                </td>
                                <td className="header">
                                    { intl.formatMessage({ id: "parent_id_label" }) }
                                </td>
                            </tr>
                            <tr>
                                <td>{ Zipkin.ConvertTimestampToDate(span.timestamp) }</td>
                                <td>{ traceId }</td>
                                <td>{ span.id }</td>
                                <td>{ span.parentId }</td>
                            </tr>
                            { span.annotations && (
                                <tr>
                                    <td className="header">
                                        { intl.formatMessage({ id: "annotation_label" }) }
                                    </td>
                                    <td className="header">
                                        { intl.formatMessage({ id: "date_time_label" }) }
                                    </td>
                                    <td className="header">
                                        { intl.formatMessage({ id: "relative_time_label" }) }
                                    </td>
                                    <td className="header">
                                        { intl.formatMessage({ id: "address_label" }) }
                                    </td>
                                </tr>
                            )}
                            { span.annotations && span.annotations.map((annotation, i) => {
                                let endpoint = annotation.endpoint.ipv4;
                                if (annotation.endpoint.port) {
                                    endpoint += `:${annotation.endpoint.port}`;
                                }
                                return (
                                    <tr key={i}>
                                        <td>
                                            { intl.formatMessage({ id: annotation.value }) }
                                        </td>
                                        <td>
                                            { Zipkin.ConvertTimestampToDate(annotation.timestamp) }
                                        </td>
                                        <td>
                                            { Zipkin.DurationToString(annotation.timestamp - startTs, intl) }
                                        </td>
                                        <td>
                                            { `${endpoint} (${annotation.endpoint.serviceName})` }
                                        </td>
                                    </tr>
                                );
                            })}
                            { span.binaryAnnotations && (
                                <tr>
                                    <td className="header">
                                        { intl.formatMessage({ id: 'key_label'}) }
                                    </td>
                                    <td className="header">
                                        { intl.formatMessage({ id: 'value_label'}) }
                                    </td>
                                </tr>
                            )}
                            {
                                span.binaryAnnotations && span.binaryAnnotations.map((annotation, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{annotation.key}</td>
                                            <td>{annotation.value}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    );
};

export default TraceSpanRow;
