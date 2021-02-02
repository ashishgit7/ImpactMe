<template>
  <div class="hello">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="2">
          <b-card no-body class="text-center">
            <div class=" " style="height: 25vh;border-radius: 5%;">
              <div class="profileBar">
                <b-avatar
                  v-b-modal.my-modal
                  class="mt-1 profileicon"
                  variant="info"
                  v-bind:src="cropped"
                ></b-avatar>
                <b-avatar
                  v-b-modal.my-modal
                  class="edit"
                  size="2rem"
                  variant="info"
                  v-bind:src="edit"
                >
                </b-avatar>
              </div>
                <span>
                  {{name}}
                </span>
            </div>
          </b-card>
        </b-col>
        <b-col cols="8" class="secondBar"></b-col>
      </b-row>
    </b-container>
    <b-modal id="my-modal" ref="modalbox" hide-footer>
      <template #modal-title> Upload your image </template>
      <input
        type="file"
        name="somename"
        size="chars"
        id="myButton"
        class="hiddenInput"
        @change="croppie"
      />
      <div  
        class="row imagebar"
        @click="uploadImage()"
        v-if="!imagePresent"
      >
        <b-icon
          icon="cloud-upload"
          style="position: relative; left: 50%"
          aria-hidden="true"
          scale="5"
        ></b-icon>
        <h1
        class="upload-text"
        >
          Upload Image
        </h1>
      </div>
      <vue-croppie
        v-else
        class="mt-1"
        ref="croppieRef"
        :enableOrientation="true"
        :boundary="{ width: 300, height: 300, type: 'circle' }"
        @result="result"
        @update="update"
      >
      </vue-croppie>

      <b-button variant="primary" block @click="crop()">Upload Image</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cropped: "https://placekitten.com/300/300",
      name:"Impact Me",
      edit:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAXVBMVEX///8AAAAwMDBzc3NycnJ2dnZpaWmtra1sbGxvb29bW1v4+PhhYWGxsbH7+/tRUVFAQEBHR0dMTExYWFioqKgoKCjBwcE9PT0xMTE4ODi4uLigoKB9fX1lZWW8vLyEPqN6AAAD50lEQVR4nO2a0VbbMBBEZRJSSCltSqFAof//meBgQhLL8aysWLM6cx/ztHN2VjuyEoIQQgghhBBCCCGEEEIIIYQAeVj+fXxa/Shdxtl4bj75V7qU8/DSfLH+XrqaM7Bo9vl5W7qe7Fw3h2xKF5SbVXPMpq4uLnsC341a0ywuIgKb5nfpsvJxFRXYNL9KF5aL40Nmr4t1GDVu0YpmMXbIfFHB0uiviaNZ9L40TnewAqOemsGdRM9dHD5FD4xausx0hvbgMRuvRkUs2hnVp0RcoNMA92oQ6HMW70wKXQa4G5tEj0tjbZPoMcBZJTrsotWo9c/iunS9CRiN6vFTsVFi6XJTsBn1uXS5KZi6eFW62jFe/0R+tEh8mr1kG+/3wW+Rnw1GfZy9ZhPb20TkdfAWl8idwLsbfewBFDbq5exVG9h9VYsZFZX4MHvZOHtf1SbM4uxl4xzc6GNGhST+n71umKOPTolGfZm9bpjeV7UkoxIfM5GPTgkSF7PXDRP9dG9eGsSBbeDxxTiLxBYdfHwxGZVY4IkPv4YAdz1/4SgnH1/gWVzOXjfMyAMoOIs+LTossWdUzwIhoxKvCeh9cNSoxIsee+EdM6pvi35w8qZBfIqO/8vipMTOqMR7cOx/MgcMziKxRQ0dHJJ4Qy3Q8ka/JWbUu9XsdcOAp+hYF3lB/yfjVqLZot4kJgqMzyIjpjXhsYsJh4wvickW/YDfqJM66EHihBn8hNuoxqgWJ/ZKzMLEGewgjmpJSaYH8Y0+j8CabhNRiDuY5ZBh/qqWYU001BadvOjZBeaZQeKPTnk6SPzZsPoZzGPR6gUSr4nqo5rWBARxB/NENeI9WP2ayNNBYoGKahDEUU03eglsIY5q1a8JRTUI4lNUUQ2C2KKKahDEayJPkiE+ZBTVIKq/0RPPYPVrQlENgjjJ5OkgscDqZ1BRDYJ4TejxBaJ6ixKHbUU1CGKLak1AECcZPb5AVG9R4kWvqAZB3EFFNQjiU1SPLxDEFlVUgyBeE4pqENVblHjR60YPQdxBRTUI4iSjxxcIYote1i4w3OcQSLwmQrjIIJB4TYQsCpktGnIoJA7bWyYrpJ7BlqkKyS0aJivkFzhRIXGS2TFJoQeBkxQ6sGiYpJB70e9IV0i/JjqSFTrpYLpCHzPYkqiQPartkabQywy2JCn0Y9GQptCVwBSFniwaUhQ6OmS2mBX6smiwK3Sz6HcYFTqbwRabQn8dNCp0N4MtFoUuLrw9DAp9CjQodGnRYFDo8ZDZgip0uCY6QIXeotoemEKvM9gCKXTcQUyh3xls2VyMce/ZokIIIYQQQgghhBBCCCGEEPPyBn/4MS2ZQBa0AAAAAElFTkSuQmCC",
      imagePresent: false,
    };
  },
  methods: {
    hideModal() {
      this.$refs["modalbox"].hide();
    },
    uploadImage() {
      document.getElementById("myButton").click();
    },
    croppie(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      var reader = new FileReader();
      reader.onload = (e) => {
        this.$refs.croppieRef.bind({
          url: e.target.result,
        });
      };

      reader.readAsDataURL(files[0]);
      this.imagePresent = true;
    },
    crop() {
      let options = {
        format: "jpeg",
        circle: true,
      };
      this.$refs.croppieRef.result(options, (output) => {
        this.cropped = output;
      });
      this.hideModal();
      this.imagePresent = false;
    },

    result(output) {
      this.cropped = output;
    },
    update(val) {
      console.log(val);
    },
  },
  mounted() {
    this.$refs.croppieRef.bind({
      url: "http://i.imgur.com/fHNtPXX.jpg",
    });
  },
};
</script>
<style scoped>
.imagebar{
  display: flex;
  height: 75vh;
  width: 100%;
  background-color: #81ccdbc4;;
  align-items: center;
  margin: 0px;
}
.upload-text{
  position: relative; 
  top: 20%; 
  text-align: center; 
  margin: auto
}
.secondBar{
  height:100vh;
  width:60vh;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 5%;
}
.hiddenInput {
  display: block;
  visibility: hidden;
  width: 0;
  height: 0;
}
.edit {
  opacity: 0;
}
.profileBar:hover .profileicon {
  opacity: 0.3;
}

.profileBar:hover .edit {
  position: relative;
  top: 0%;
  left: -23%;
  opacity: 0.5;
}
</style>
