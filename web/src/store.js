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

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import constants from "./constants.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiData: [],
    apiURL: constants.API_ENDPOINT,
    apiLoading: true,
    returnItemsCount: 0,
    dataReady: false,
    queryString: "",
    searchTerm: "",

    chkDocuments: true,
    chkData: true,
    chkProcess: true,

    chkSolar: true,
    chkUSGaap: true,
    chkDEI: true,

    chkNonnumeric: true,
    chkNumeric: true,

    chkCustomary: true,
    chkISO4217: true,
    chkSI: true,
    chkNonSI: true
  },
  getters: {
    apiData: state => state.apiData
  },
  mutations: {
    callAPI(state, payload) {

      // Note: its very important to clear data so that views don't update with data from another page
      // before API call completes.
      state.apiLoading = true;
      state.apiData = [];
      state.returnItemsCount = 0;
      state.dataReady = false;
      axios
          .get(state.apiURL + payload + "/", {
          })
          .then(response => {
            state.apiLoading = false;
            state.apiData = response.data;
            state.returnItemsCount = response.data.length;
            state.dataReady = true;
          });
    },
    toggleAPILoading(state) {
      state.apiLoading = !state.apiLoading;
    },
    toggleDataReady(state) {
      state.dataReady = false;
    },
    clearQueryString(state) {
      state.queryString = "";
    }
  }
});
