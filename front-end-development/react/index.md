 

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/zbsilent' },
      { icon: 'twitter', link: 'https://twitter.com/zbsilent' }
    ]
  }
]
</script>

# Our Team

Say hello to our awesome team.

<VPTeamMembers size="small" :members="members" />

 
 

### Title <Badge type="info">custom element</Badge>
### Title <Badge type="danger" text="caution" />
[Home](/) <!-- 将用户导航至根目录下的 index.html --><br/>
[foo](/font-end/react/23423.md) <!-- 将用户导航至目录 foo 下的 index.html --><br/>
[foo heading](/front-end-development/react/reactypescript#核心编程) <!-- 将用户锚定到目录 foo 下的index文件中的一个标题上 --><br/>
[bar - three](../bar/three) <!-- 可以省略扩展名 --><br/>
[bar - three](../bar/three.md) <!-- 可以添加 .md --><br/>
[bar - four](../bar/four.html) <!-- 或者可以添加 .html --><br/>



 