<!-- <svelte:options tag="vf-kanban-card" /> -->

<script>
  export let onClick
  export let note
  export let due
  export let members = []
</script>

<style>
.card {
  background: white;
  border-bottom: 1px solid #ccc;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  z-index: 10;
  display: block;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  cursor: pointer;
  margin-bottom: 6px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  z-index: 0;
  padding: 10px;
}

.card:hover {
background: #EDEFF0;
border-bottom-color: #d6dacc;
}

.card.dragged {
opacity: .5;
cursor: move;
}

.card_title {
  font-size: 14px;
  line-height: 20px;
  clear: both;
  font-weight: 400;
  margin: 0 0 4px;
  overflow: hidden;
  word-wrap: break-word;
  color: #4d4d4d;
}

.card_infos{
margin-top: 10px;
}

.card_infos .infos_due{
color: #ADADAD;
font-weight: 500;
font-size: 12px;
letter-spacing: 1px;
margin: 0;
float: left;
height: 20px;
line-height: 20px;
}

.card_infos .infos_members {
float: right;
}

.card_infos .infos_members .members_item {
width: 20px;
height: 20px;
border-radius: 100%;
display: inline-block;
background: #adadad;
margin-left: 5px;
}

.card_infos .infos_members .members_item  img {
width: 20px;
height: 20px;
border-radius: 100%;
}
</style>

<div on:click={onClick} class="card">
  <span class="card_title">{note}</span>
  <div class="card_infos">
    <h4 class="infos_due">Due to {due}</h4>
    <div class="infos_members">
      {#each members as member}
        <span class="members_item">
          <img class="item_photo" alt="{member.name}'s profile pic" src={member.image} />
        </span>
      {/each}
    </div>
  </div>
</div>
