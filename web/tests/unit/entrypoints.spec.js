//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import EntrypointsPage from "@/views/EntrypointsPage.vue";
import EntrypointFilter from "@/components/EntrypointFilter.vue"
import EntrypointList from "@/components/EntrypointList.vue"

let state
let store

const localVue = createLocalVue()
localVue.use(Vuex)

state = {
        searchTerm: "test",
        apiData: [{"entrypoint": "Site", "type": "Data"}],
        returnItemsCount: 160
}

store = new Vuex.Store({
    state
})

describe('EntrypointsPage', () => {

  it('renders a correct markup clip', () => {
    const wrapper = shallowMount(EntrypointsPage, { store, localVue })
    expect(wrapper.html()).toContain('Download Search Results')
  })

})

describe('EntrypointFilter', () => {

  it('renders a correct markup clip', () => {
    const wrapper = shallowMount(EntrypointFilter, {store, localVue})
    expect(wrapper.html()).toContain('Documents')
  })
})

describe('EntrypointList', () => {

  it('renders a correct markup clip', () => {
    const wrapper = shallowMount(EntrypointList, {store, localVue})
    expect(wrapper.html()).toContain('entrypoint-public-list-container')
  })
})