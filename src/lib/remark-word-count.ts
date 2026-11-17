/**
 * Remark plugin: counts the words in a post (prose and code) at compile time and
 * writes `wordCount: N` into its YAML frontmatter, so remark-mdx-frontmatter exports
 * it alongside title/date. Must run before remark-mdx-frontmatter.
 */
interface Node {
  type: string
  value?: string
  children?: Node[]
}

function collectText(node: Node, out: string[]) {
  if (node.type === 'yaml') return
  if (typeof node.value === 'string' && ['text', 'inlineCode', 'code'].includes(node.type)) {
    out.push(node.value)
  }
  node.children?.forEach((child) => collectText(child, out))
}

export default function remarkWordCount() {
  return (tree: Node) => {
    const parts: string[] = []
    collectText(tree, parts)
    const words = parts.join(' ').trim().split(/\s+/).filter(Boolean).length

    const yaml = tree.children?.find((child) => child.type === 'yaml')
    if (yaml && typeof yaml.value === 'string' && !/^wordCount:/m.test(yaml.value)) {
      yaml.value = `${yaml.value}\nwordCount: ${words}`
    }
  }
}
