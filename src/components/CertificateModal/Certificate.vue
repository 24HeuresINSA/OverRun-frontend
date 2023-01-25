<template>
  <div class="container-fluid p-0 h-100">
    <div class="row" id="certificate-row">
      <div class="col-15 h-100 p-4 centered">
        <div class="certificate" id="certificate-container">
          <embed
            :src="imageLink"
            class="h-100"
            width="800vw"
            id="certificate-img"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div
          class="btn-group light-text"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button
            type="button"
            class="btn menue-btn skip"
            :disabled="!previous"
            @click="previousInscription"
          >
            Précedent
          </button>
          <button
            type="button"
            class="btn menue-btn valide"
            @click="validationOfCertificateWithStatus('', 1)"
          >
            Valider
          </button>
          <button
            type="button"
            class="btn menue-btn reject"
            @click="toogleConfirmRefuseCertificat"
          >
            Refuser
          </button>
          <button
            type="button"
            class="btn menue-btn skip"
            :disabled="!next"
            @click="nextInscription"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  </div>
  <ConfirmRefuseCertificat
    v-show="showConfirmRefuseCertificat"
    @closeConfirmRefuseCertificat="toogleConfirmRefuseCertificat"
    @sendReason="validationOfCertificateWithStatus($event, 5)"
  />
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import ConfirmRefuseCertificat from "@/components/CertificateModal/ConfirmRefuseCertificat.vue";

export default defineComponent({
  components: {
    ConfirmRefuseCertificat,
  },
  data() {
    return {
      imageLink: "",
      showConfirmRefuseCertificat: false,
    };
  },
  props: {
    next: Boolean,
    previous: Boolean,
    certificateId: {
      type: Number,
      required: true,
    },
    certificateFile: {
      type: String,
      required: true,
    },
  },
  methods: {
    nextInscription() {
      this.$emit("next");
    },
    previousInscription() {
      this.$emit("previous");
    },
    toogleConfirmRefuseCertificat() {
      this.showConfirmRefuseCertificat = !this.showConfirmRefuseCertificat;
    },
    async getImage(): Promise<string> {
      if (!this.certificateFile) return "";
      const response = await fetch(
        `${process.env.VUE_APP_API_BASE_URL}/static/${this.certificateFile}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/getAccessToken"]}`,
          },
        }
      );

      if (response.status === 200) {
        const url = URL.createObjectURL(await response.blob());
        return url;
      }
      return "";
    },
    async validationOfCertificateWithStatus(reason: string, status: number) {
      const response = await axios.post(`certificates/${this.certificateId}`, {
        // Status signification
        // 1: Validated
        // 2: Being validated
        // 3: Seen
        // 4: Unseen
        // 5: Rejected
        status,
        statusUpdatedById: this.$store.getters["auth/getAdminId"],
        reason,
      });
      if (response.status === 200) {
        if (status === 1) this.$emit("validate");
        if (status === 5) this.toogleConfirmRefuseCertificat();
        this.$emit("next");
      }
    },
  },
  watch: {
    certificateFile(newFile, oldFile) {
      this.getImage().then((url) => {
        this.imageLink = url;
      });
    },
  },
});
</script>

<style scoped>
#certificate-row {
  height: calc(100vh - 70px);
  max-height: calc(100vh - 70px) !important;
}

#certificate-container {
  height: 100%;
  width: auto;
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.centered-element {
  min-height: calc(100% - 70px);
  display: inline-flex;
  align-items: center;
}

.valide {
  background: #f2938d;
}

.skip {
  background: #fbe786;
}

.reject {
  background: #a94341;
}

.menue-btn {
  width: 100px;
  height: 50px;
  font-weight: bolder;
  color: #413d3c;
}

.side-btn {
  background: none;
  border: none;
}
</style>
