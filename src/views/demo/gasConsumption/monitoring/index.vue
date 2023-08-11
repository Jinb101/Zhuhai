<template>
  <div class="h-full w-full px-2 py-2">
    <div class="w-full h-[8%] bg-white rounded flex justify-center items-center px-2 pt-6">
      <el-form :model="form" class="w-full flex justify-between items-center">
        <div class="flex justify-start items-center h-full w-full">
          <el-form-item>
            <el-select v-model="form.region" placeholder="区域">
              <el-option label="生产车间" value="shnegcang" />
              <el-option label="涂料车间" value="tuliao" />
              <el-option label="橡胶车间" value="xiangjiao" />
            </el-select>
          </el-form-item>
          <div class="ml-2">
            <el-form-item>
              <el-col :span="11">
                <el-date-picker v-model="form.staTime" type="date" placeholder="开始时间" />
              </el-col>
              <el-col :span="11">
                <el-date-picker
                  v-model="form.endTime"
                  type="date"
                  placeholder="结束时间"
                  style="margin-left: 2rem"
                />
              </el-col>
            </el-form-item>
          </div>
          <div class="ml-8">
            <el-form-item>
              <el-input placeholder="关键字" v-model="form.desc" />
            </el-form-item>
          </div>
          <el-form-item>
            <el-button class="ml-2" @click="onSubmit">查询</el-button>
          </el-form-item>
          <div class="w-1/5 flex justify-end">
            <el-form-item>
              <el-button type="primary">添加</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <!-- form -->
    <el-table :data="tableData" max-height="700" style="width: 100%" class="w-full mt-8 rounded">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
            修改
          </el-button>
          <el-button link size="small" @click.prevent="deleteRow(scope.$index)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { listGasApi } from '/@/api/demo/gasConsumption';

  // do not use same name with ref
  const form = reactive({
    region: '',
    staTime: '',
    endTime: '',
    desc: '',
  });

  const onSubmit = () => {
    console.log('submit!');
  };

  // form data
  const tableData = ref([
    {
      date: '2016-05-01',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    },
  ]);

  const deleteRow = (index: number) => {
    tableData.value.splice(index, 1);
  };
  onMounted(() => {
    listGasApi(1, 10).then((res) => {
      console.log(res);
    });
  });
</script>

<style scoped>
  .flex_j_i {
    display: flex;
    justify-content: start;
    align-items: center;
  }
</style>
