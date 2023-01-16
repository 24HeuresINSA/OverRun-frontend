<template>
  <div
    class="col-md-2 p-0 primary-bg h-100 mr-5 pr-5 fixed-top shadow"
    id="side-bar"
    v-show="!hide"
  >
    <div id="menue">
      <SideBarMainLink
        route="Home"
        title="Dashboard"
        icon="home"
        :activeVue="activeVue"
      />
      <SideBarMainLinkDropdown
        @isActive="setActiveDropdowns"
        title="Courses"
        icon="timer"
        :activeVue="activeVue"
        :childIsActive="
          ['Races', 'Categories', 'Disciplines'].includes(String(activeVue))
        "
      />
      <div
        v-show="
          activeDropdowns.includes('Courses') ||
          ['Races', 'Categories', 'Disciplines'].includes(String(activeVue))
        "
      >
        <SideBarSecondaryLink
          route="Races"
          title="Courses"
          :activeVue="activeVue"
        />
        <SideBarSecondaryLink
          route="Categories"
          title="Categories"
          :activeVue="activeVue"
        />
        <SideBarSecondaryLink
          route="Disciplines"
          title="Disciplines"
          :activeVue="activeVue"
        />
      </div>
      <SideBarMainLink
        route="Inscriptions"
        title="Athletes"
        icon="directions_run"
        :hasSecondaryLinks="false"
        :activeVue="activeVue"
      />
      <SideBarMainLink
        route="Teams"
        title="Equipes"
        icon="groups"
        :activeVue="activeVue"
      />
      <SideBarMainLink
        route="Payments"
        title="Paiements"
        icon="euro_symbol"
        :activeVue="activeVue"
      />

      <div class="p-2"></div>
      <hr class="dropdown-divider" />
      <SideBarMainLink
        route="Athletes"
        title="Utilisateurs"
        icon="manage_accounts"
        :activeVue="activeVue"
      />
      <SideBarMainLinkDropdown
        @isActive="setActiveDropdowns"
        title="Admins"
        icon="admin_panel_settings"
        :activeVue="activeVue"
        :childIsActive="['Admins', 'AdminInvites'].includes(String(activeVue))"
      />
      <div
        v-show="
          activeDropdowns.includes('Admins') ||
          ['Admins', 'AdminInvites'].includes(String(activeVue))
        "
      >
        <SideBarSecondaryLink
          route="Admins"
          title="Administrateurs"
          :activeVue="activeVue"
        />
        <SideBarSecondaryLink
          route="AdminInvites"
          title="Invitations"
          :activeVue="activeVue"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBarMainLink from "./SideBarMainLink.vue";
import SideBarMainLinkDropdown from "./SideBarMainLinkDropdown.vue";
import SideBarSecondaryLink from "./SideBarSecondaryLink.vue";

export default defineComponent({
  components: {
    SideBarMainLink,
    SideBarSecondaryLink,
    SideBarMainLinkDropdown,
  },
  props: {
    hide: Boolean,
    activeVue: String,
  },
  data() {
    return {
      selectedLink: "Dashboard",
      toggleElem: "",
      activeDropdowns: [] as string[],
    };
  },
  methods: {
    setActiveDropdowns(elem: string, isActive: boolean) {
      if (isActive) {
        this.activeDropdowns.push(elem);
      } else {
        const index = this.activeDropdowns.indexOf(elem);
        if (index !== -1) {
          this.activeDropdowns.splice(index, 1);
        }
      }
    },
  },
});
</script>

<style scoped>
#side-bar {
  margin-top: 60px;
  width: 320px;
  height: calc(100vh - 60);
  z-index: 100;
}

#menue {
  margin: 50px 0;
  width: 100%;
}

#footer {
  height: 30px;
  background: #24305e;
}
</style>
