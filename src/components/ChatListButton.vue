<template>
  <el-button class="listButton" plain type="primary" @click="drawer = true" :size="buttonSize">
    <el-icon><List /></el-icon>
  </el-button>
  <el-drawer title="聊天列表" v-model="drawer" direction="ltr" size="drawerSize">
    <el-table :data="chatLists" stripe style="width: 100%">
      <el-table-column label="详细信息" width="200">
        <template v-slot="{ row }">
          <div class="name">{{ row.name }}</div>
          <div class="created-at">{{ row.createdAt }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template v-slot="{ $index }">
          <el-button @click.stop="confirmDelete($index)" circle
            ><el-icon><CloseBold /></el-icon
          ></el-button>
          <el-button @click.stop="confirmSelect($index)" circle
            ><el-icon><Select /></el-icon
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button plain type="primary" @click="newMessages">新增聊天</el-button>
  </el-drawer>
</template>
<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import { onMounted, onUnmounted, ref, onUpdated } from 'vue'
import { useChatListStore } from '@/store/message'
import { useCreatedAtStore } from '@/store/id'

const chatListStore = useChatListStore()

// 按钮大小
const drawerSize = ref<'30%' | '100%'>('30%')
const buttonSize = ref<'default' | 'small'>('default')
const updateSize = () => {
  drawerSize.value = window.innerWidth <= 768 ? '100%' : '30%'
  buttonSize.value = window.innerWidth <= 768 ? 'small' : 'default'
}
onMounted(() => {
  window.addEventListener('resize', updateSize)
  updateSize()
  // 从store加载聊天列表

  onUpdated(() => {
    chatLists.value = chatListStore.ChatLists.map((chatList) => ({
      name: chatList.name,
      createdAt: new Date(chatList.createdAt * 1000).toLocaleString()
    }))
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSize)
})
interface ChatListItem {
  name: string
  createdAt: string
}

const drawer = ref(false)
const chatLists = ref<ChatListItem[]>([])

const confirmDelete = (index: number) => {
  ElMessageBox.confirm('确定要删除这个聊天列表吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 这里需要转换index到store中相应的createdAt
      const createdAt = chatListStore.ChatLists[index].createdAt
      // 下面的函数假设你有在store里实现一个名为deleteChatList的action
      chatListStore.findChatListByCreatedAt(createdAt)
      // 更新前端聊天列表视图
      chatLists.value.splice(index, 1)
    })
    .catch(() => {
      // 处理取消操作
    })
}

const emit = defineEmits(['selectChatList'])

const confirmSelect = (index: number) => {
  const createdAt = chatListStore.ChatLists[index].createdAt
  // 发出事件，并将createdAt作为参数传递给父组件
  console.log(createdAt)
  emit('selectChatList', createdAt)
  drawer.value = false
}

const newMessages = () => {
  const createdAtStore = useCreatedAtStore()
  createdAtStore.setCreatedAt(Date.now())
  emit('selectChatList', createdAtStore.getCreatedAt())
  drawer.value = false
}
</script>

<style>
.listButton {
  margin-top: 10px;
  /* margin-left: 10px; */
}
.chat-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .el-button {
    margin-left: 10px;
  }
}
</style>
