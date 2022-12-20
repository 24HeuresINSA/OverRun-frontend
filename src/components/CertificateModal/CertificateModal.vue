<template>
  <div class="backdrop" v-if="certificates">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-9">
          <Certificate
            @next="nextInscription"
            @previous="previousInscription"
            @validate="validateCertificate"
            :next="certificates?.length > currentIndex + 1"
            :previous="currentIndex > 0"
            :certificateId="certificates[currentIndex]?.id"
            :certificateFile="certificates[currentIndex]?.filename"
          />
        </div>
        <div class="col-3">
          <SideInfo
            @hideCertificate="closeModal"
            :inscriptionId="certificates[currentIndex]?.inscription.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Certificate as CertificateType } from "@/types/interface";
import { defineComponent } from "vue";
import Certificate from "./Certificate.vue";
import SideInfo from "./SideInfo.vue";

export default defineComponent({
  props: {
    certificates: {
      type: Array as () => CertificateType[],
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  components: {
    Certificate,
    SideInfo,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    closeModal() {
      this.$emit("hideCertificate", false, [], 0);
    },
    nextInscription() {
      if (this.certificates) {
        if (this.certificates?.length > this.currentIndex + 1) {
          this.currentIndex += 1;
        }
      }
    },
    previousInscription() {
      if (this.certificates) {
        if (this.currentIndex - 1 >= 0) {
          this.currentIndex -= 1;
        }
      }
    },
    validateCertificate() {
      this.certificates.splice(this.currentIndex, 1);
    },
  },
  watch: {
    index(newIndex, oldIndex) {
      this.currentIndex = newIndex;
    },
  },
  mounted() {
    var self = this;
    window.addEventListener("keyup", function (event) {
      if (event.key === "Escape") {
        self.closeModal();
      }
      if (event.key === "ArrowRight") {
        self.nextInscription();
      }
      if (event.key === "ArrowLeft") {
        self.previousInscription();
      }
    });
  },
});
</script>

<style scoped>
.modal {
  width: 400px;
  padding: 20px;
  margin: 100px;
  background: white;
  border-radius: 10px;
}

.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 10001;
}
</style>
