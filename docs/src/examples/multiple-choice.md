<script setup>
import '../../dist/style.css'
import { MultipleChoice } from '../../'
</script>

# Multiple Choice
<br>

<MultipleChoice
  style="min-height: 800px;"
  statement="Foo"
  background="https://t4.ftcdn.net/jpg/03/34/19/13/240_F_334191354_zW1Fj9HPbfJdBPEVe2d6mcuT1w2g8K5y.jpg"
  :options="[
    { label: 'Option 1', percentage: 10 },
    { label: 'Option 2', percentage: 10 },
    { label: 'foo2&lt;br&gt;&lt;img src=\'https://t4.ftcdn.net/jpg/03/34/19/13/240_F_334191354_zW1Fj9HPbfJdBPEVe2d6mcuT1w2g8K5y.jpg\' /&gt;', percentage: 0 },
    { label: '&lt;audio id=&quot;myaudio&quot; controls &gt;&lt;source src=&quot;horse.mp3&quot; type=&quot;audio/mpeg&quot;&gt;&lt;/audio&gt;', percentage: 0 },
    { label: 'Option 4', percentage: 100 }
  ]"
/>
