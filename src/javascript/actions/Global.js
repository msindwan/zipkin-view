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
 * Global Actions
 *
 * @Date : 2017-12-24
 * @Description : Global Actions.
 **/

import { Action } from 'reduxion';

/**
 * Toggle Sidebar
 *
 * Description: Dispatches the toggle for the sidebar visibility filters.
 * @param toggle {boolean} // True if visible; false otherwise.
 * @returns {object} // The toggle to set.
 */
const ToggleSidebar = Action("toggleSidebar", toggle => {
    return toggle;
});

/**
 * Set Storage
 *
 * Description: Dispatches the storage mode.
 * @param storage {string} // The storage mode as a string.
 * @returns {string} // The storage mode to set.
 */
const SetStorage = Action("setStorage", storage => {
    return storage;
});

export {
    ToggleSidebar,
    SetStorage
};
