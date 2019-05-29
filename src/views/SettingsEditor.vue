<template>
  <el-container>
    <el-header>
      <h2>Goodcity Settings Editor</h2>
    </el-header>
    <el-main>
      <!-- ACTION BUTTONS -->
      <div style="margin-bottom: 1rem;">
        <el-button size="mini" @click="loadSettings" type="success">reload</el-button>
        <el-button size="mini" @click="createSetting" type="primary">new setting</el-button>
        <el-button size="mini" @click="logout" type="warning">logout</el-button>
      </div>

      <el-table :data="settings"  style="width: 100%">
        <!-- KEY -->
        <el-table-column prop="key" label="Key">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.key }}</el-tag>
          </template>
        </el-table-column>

        <!-- VALUE -->
        <el-table-column prop="value" label="Edit">
          <template slot-scope="scope">
            <el-row :gutter="10">
              <el-col :span="14">
                <el-input placeholder="value" v-model="scope.row.value"></el-input>
              </el-col>
              <el-col :span="5">
                <el-button @click="updateSetting(scope.row)">Save</el-button>
              </el-col>
              <el-col :span="5">
                <el-button type="danger" plain @click="deleteSetting(scope.row.id)">Remove</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <!-- DESC -->
        <el-table-column prop="description" label="Description" ></el-table-column>
      </el-table>

      <!-- CREATION DIALOG -->
      <el-dialog v-if="newSetting" title="+ New Setting" :visible="true" :show-close="false">
        <el-form>
          <el-form-item label="Key">
            <el-input v-model="newSetting.key" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Value">
            <el-input v-model="newSetting.value" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="newSetting.description" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="newSetting = null">Cancel</el-button>
          <el-button type="primary" @click="saveNewSetting()">Confirm</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ErrorMixin from '../mixins/error';

export default {
  mixins: [ErrorMixin],
  computed: {
    ...mapGetters(['settings'])
  },
  data() {
    return { newSetting: null };
  },
  methods: {
    ...mapActions(['logout', 'loadSettings', 'updateSetting', 'deleteSetting']),

    // ------------------------------------------
    createSetting() {
      this.newSetting = {
        key: "",
        value: "",
        description: ""
      };
    },

    // ------------------------------------------
    async saveNewSetting() {
      try {
        await this.$store.dispatch('createSetting', this.newSetting);
        this.newSetting = null;
      } catch (e) {
        this.error(e);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>