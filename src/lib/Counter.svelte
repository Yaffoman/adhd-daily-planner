<script lang="ts">
  import {getPersona, updatePersona} from "../firestore";
  import {chatRequest} from "../openai_langchain";
  import {sampleResume} from "../sample";

  let count: number = 0
  const increment = async () => {
    const samplePersona = {
      name: "string",
      occupation: "string",
      skills: ["string[]"],
      experience: ["string[]"],
      education: ["string[]"]
    }
    // await updatePersona("test-user", samplePersona)
    console.log(await getPersona("test-user"));
    const resp = await chatRequest(sampleResume)
    // await updatePersona("test-user", resp)
    count += 1;
  }

</script>

<button on:click={increment}>
  count is {count}
</button>
