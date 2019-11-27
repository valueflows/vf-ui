<script>
  import Bin from './kanban/Bin.svelte'

  export let bins = []
</script>

<style>
  .board_container {
    position: relative;
  }

  .board {
    user-select: none;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    position: absolute;
    right: 0;
    left: 0px;
    top: 0;
    margin-bottom: 20px;
  }
</style>

<div class="board_container">
  <div class="board">
    {#each bins as bin}
      <Bin
        cards={bin.cards}
        outputs={bin.outputs}
        due={bin.due}
        title={bin.title}
        note={bin.note}
      />
    {/each}
  </div>
</div>
