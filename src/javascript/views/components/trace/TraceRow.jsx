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
 * Trace Row
 *
 * @Date : 2018-01-21
 * @Description : Trace Viewer Row.
 **/

import Zipkin from '../../../util/Zipkin';
import React from 'react';

const TraceRow = ({
    onToggleClicked,
    onSpanClick,
    numHeaders,
    className,
    collapsed,
    depth,
    width,
    span,
    left,
    intl
}) => {
    const emptyCells = [];
    for (let i = numHeaders - 2; i > 0; i--) {
        emptyCells.push((<td key={i}></td>));
    }
    return (
        <tr
            data-key={span.id}
            className={className}
            onClick={e => onSpanClick(e, span)}
            key={span.id}>
            <td>
                <div style={{ marginLeft: depth }} className="zk-ui-trace-service-name">
                    { span._meta_.children.length ?
                        <i
                            onClick={e => onToggleClicked(e, span)}
                            className={`zk-ui-trace-span-toggle fa fa-${collapsed ? 'plus' : 'minus'}`} /> :
                        <i className="zk-ui-trace-span-toggle fa fa-minus hidden"></i> }
                    { span._meta_.orphan && (
                        <i
                            className="fa fa-warning"
                            title={`${intl.formatMessage({ id: 'missing_parent_label'})}`} />
                    )}
                    <span>{ Zipkin.GetSpanService(span) }</span>
                </div>
            </td>
            <td>
                <div className="zk-ui-trace-span" style={{ marginLeft: left, width: width }}>
                    {`${Zipkin.DurationToString(span.duration, intl)} : ${span.name}`}
                </div>
            </td>
            { emptyCells }
        </tr>
    );
};

export default TraceRow;
