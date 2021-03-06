<!--
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->

<template>
    <div class="public-filter">
        <form @submit.prevent>
            <div class="form-group">
                <label for="keyword_search">
                    <h1>Keyword</h1>
                    <input
                            type="text"
                            class="form-control"
                            id="keyword_search"
                            v-model="$store.state.searchTerm"
                    />
                </label>
            </div>

            <h1>Search Type</h1>
            <div class="form-group">
                <label for="name">
                    <input type="checkbox" id="name" value="Name" v-model="$store.state.chkName"/> Name
                </label>
                <label for="description">
                    <input type="checkbox" id="description" value="Description" v-model="$store.state.chkDescription"/> Description
                </label>
                <label for="type">
                    <input type="checkbox" id="type" value="Type" v-model="$store.state.chkType"/> Type
                </label>
                <label for="enumerations">
                    <input type="checkbox" id="enumerations" value="Enumerations" v-model="$store.state.chkEnumerations"/> Enumerations
                </label>
                <label for="unit">
                    <input type="checkbox" id="unit" value="Unit" v-model="$store.state.chkUnit"/> Unit
                </label>
            </div>
            <h1>Concept Type</h1>
            <div class="form-group">
                <label for="solar">
                    <input type="checkbox" id="solar" value="Solar" v-model="$store.state.chkSolar"/> Solar
                </label>
                <label for="usgaap">
                    <input type="checkbox" id="usgaap" value="USGaap" v-model="$store.state.chkUSGaap"/> US-Gaap
                </label>
                <label for="dei">
                    <input type="checkbox" id="dei" value="DEI" v-model="$store.state.chkDEI"/> DEI
                </label>
                <label for="entryPointSelector">
                  <h1>Select entrypoint:</h1>
                  <b-form-select id="entryPointSelector" v-model="entryPointSelected" :options="entryPointList" />
                </label>
              Selected Entrypoint Link: <br>
              <a href @click.prevent="copyLinkToClipboard">Copy to Clipboard</a> or <a :href=filterMailtoLink>Email</a>
            </div>
            <div class="button-group">
                <button type="button" class="btn btn-primary" @click="clearFilters">
                    <v-icon name="times" class="clear-icon"/>&nbsp;&nbsp;Clear filters
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      entryPointSelected: 'none'
    }
  },
  beforeCreate() {
    this.$store.commit("callAPIentrypoints");
  },
  created() {
    // if query params, create cookie
    // query param form = ?views=
    if (Object.keys(this.$route.query).length !== 0) {
      let givenEntryPoint = this.$route.query['views'];
      if (this.$store.state.entryPointList.includes(givenEntryPoint)) {
        // setting entryPointSelected triggers the watch for it below, updating the data list
        this.entryPointSelected = givenEntryPoint;
      }
    }
  },
  methods: {
    clearFilters() {
      this.$store.commit("toggleAPILoading");
      this.$store.state.searchTerm = "";
      this.$store.commit("clearQueryString");
      this.$store.commit("clearConceptsChks");
      this.$store.commit("resetConceptsTypes");
      this.entryPointSelected = '';
      this.$store.commit("callAPI", "concepts/none");
    },
    selectAll() {
      this.$store.commit("selectAllConceptsTypes")
    },
    getParameterizedURL() {
      let currentURL = window.location.href;
      if (currentURL.indexOf("?") > 0) {
        currentURL = currentURL.substring(0, currentURL.indexOf("?"));
      }
      return currentURL + "?views=" + this.entryPointSelected;
    },
    copyLinkToClipboard() {
      navigator.clipboard.writeText(this.getParameterizedURL())
        .then(() => { /* success */ })
        .catch(() => { /* failed */ });
    }
  },
  computed: {
    filterMailtoLink: function() {
      return "mailto:?body=" + this.getParameterizedURL();
    },
    entryPointList: function() {
      let items = [];
      items.push({ value: 'none', text: '-- All --' });
      for(let item of this.$store.state.entryPointList) {
        items.push({ value: item, text: item });
      }
      return items;
    }
  },
  watch: {
    entryPointSelected() {
      if (this.entryPointSelected) {
        this.$store.commit("callAPI", "concepts/" + this.entryPointSelected);
      }
    }
  }
};

</script>

<style scoped>
.clear-icon {
  color: #db4437;
  margin-bottom: 3px;
}

.search-icon {
  color: #4285f4;
  margin-bottom: 3px;
}
h1 {
  font-size: 18px;
  color: #4b4e52;
  font-family: "Roboto Condensed";
  font-weight: bold;
}

.public-filter {
  padding-left: 20px;
  padding-top: 5px;
}

.form-group {
  font-family: "Roboto Condensed";

  display: block;
}

button {
  margin: 1px;
  margin-bottom: 15px;
}

label {
  display: block;
}

.button-group {
  display: flex;
  justify-content: left;
  padding-left: 0.5em;
  margin-bottom: 5px;
  margin-left: -17px;
}

.btn-primary,
.btn-primary:active,
.btn-primary:visited,
.btn-primary:focus,
.btn-primary:disabled {
  background-color: white;
  border-color: #4b4e52;
  color: #4b4e52;
}

.btn-primary:hover {
  background-color: #eeeeee;
  color: #4b4e52;
  border-color: #4b4e52;
}

label {
  margin-top: 3px;
  margin-bottom: 3px;
}
</style>
