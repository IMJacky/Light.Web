<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title">
        {{ timeFix }}，{{ user.nickname }}
        <span class="welcome-text">，{{ welcome }}</span>
      </div>
      <div>{{ user.jobName }} | {{ user.deptNameList ? user.deptNameList.join(' - ') : '' }}</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="8">
          <head-info
            title="用户数"
            :content="'   ' + workplace.userCount"
            :center="false"
            :bordered="false"
          />
        </a-col>
        <a-col :span="8">
          <head-info
            title="部门数"
            :content="'   ' + workplace.deptCount"
            :center="false"
            :bordered="false"
          />
        </a-col>
        <a-col :span="8">
          <head-info title="岗位数" :content="'   ' + workplace.jobCount" :center="false" />
        </a-col>
      </a-row>
    </div>

    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="功能列表"
            :body-style="{ padding: 0 }"
          >
            <a slot="extra">更多功能正在赶来...</a>
            <div>
              <a-card-grid
                class="project-card-grid"
                :key="i"
                v-for="(item, i) in workplace.functionList"
              >
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a-avatar size="small" :src="item.avatarUrl" />
                      <a>{{ item.title }}</a>
                    </div>
                    <div slot="description" class="card-description">
                      <ellipsis :length="70" tooltip>{{ item.description }}</ellipsis>
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <a>{{ item.deptName }} {{ item.developer }}</a>
                    <span class="datetime">{{ item.completeDate }}</span>
                  </div>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>

          <a-card title="动态" :bordered="false">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <div slot="title">
                    <span>{{ item.userName }}</span>&nbsp;
                    在&nbsp;
                    <a href="#">{{ item.logTypeName }}</a>&nbsp;
                    <span>{{ item.operateTypeName }}</span>&nbsp;
                    <a href="#">{{ item.logSubTypeName }}</a>
                  </div>
                  <div slot="description">{{ item.operationTime }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            title="快速开始 / 便捷导航"
            style="margin-bottom: 24px"
            :bordered="false"
            :body-style="{padding: 0}"
          >
            <div class="item-group">
              <a
                target="_blank"
                :href="item.url"
                :key="i"
                v-for="(item, i) in workplace.quickNavList"
              >{{ item.title }}</a>
            </div>
          </a-card>
          <a-card
            title="一周登录统计"
            style="margin-bottom: 24px;"
            :bordered="false"
            :body-style="{ padding: 0 }"
          >
            <div>
              <bar style="padding: 0px;" :data="workplace.barLoginList" />
            </div>
          </a-card>
          <a-card title="开发团队" :bordered="false">
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in teams" :key="index">
                  <a>
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-view>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'

import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'
import { Bar, Ellipsis } from '@/components'
import { getLogList, getWorkplace } from '@/api/manage'

export default {
  name: 'Workplace',
  components: {
    PageView,
    HeadInfo,
    Bar,
    Ellipsis
  },
  data () {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},
      activities: [],
      teams: [{ name: '王杰光', avatar: '/wjg.jpg' }],
      workplace: {}
    }
  },
  computed: {
    ...mapState({
      nickname: (state) => state.user.nickname,
      welcome: (state) => state.user.welcome
    }),
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar
  },
  mounted () {
    this.getActivity()
    this.getWorkplace()
  },
  methods: {
    getWorkplace () {
      getWorkplace()
        .then(res => {
          this.workplace = res.result
        })
    },
    getActivity () {
      getLogList({ pageSize: 5 })
        .then(res => {
          this.activities = res.result.data
        })
    }
  }
}
</script>

<style lang="less" scoped>
.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }
  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }
    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }
  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;
  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;
    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }
    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
