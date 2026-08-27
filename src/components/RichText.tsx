import React from 'react'
import { cn } from '@/lib/utils'

// Lexical node types
type Node = {
  type?: string
  tag?: string
  text?: string
  format?: number | string
  style?: string
  children?: Node[]
  url?: string
  newTab?: boolean
  listType?: 'bullet' | 'number' | 'check'
  value?: number
  [key: string]: any
}

type RichTextProps = {
  content?: { root?: Node } | Node | null
  className?: string
}

const IS_BOLD = 1
const IS_ITALIC = 1 << 1
const IS_STRIKETHROUGH = 1 << 2
const IS_UNDERLINE = 1 << 3
const IS_CODE = 1 << 4
const IS_SUBSCRIPT = 1 << 5
const IS_SUPERSCRIPT = 1 << 6

function renderTextNode(node: Node, key: number): React.ReactNode {
  let text: React.ReactNode = node.text || ''
  const format = typeof node.format === 'number' ? node.format : 0

  if (format & IS_BOLD) {
    text = <strong>{text}</strong>
  }
  if (format & IS_ITALIC) {
    text = <em>{text}</em>
  }
  if (format & IS_UNDERLINE) {
    text = <u>{text}</u>
  }
  if (format & IS_STRIKETHROUGH) {
    text = <s>{text}</s>
  }
  if (format & IS_CODE) {
    text = <code>{text}</code>
  }
  if (format & IS_SUBSCRIPT) {
    text = <sub>{text}</sub>
  }
  if (format & IS_SUPERSCRIPT) {
    text = <sup>{text}</sup>
  }

  return <React.Fragment key={key}>{text}</React.Fragment>
}

function renderNode(node: Node, key: number): React.ReactNode {
  if (!node) return null

  // Text node
  if (node.type === 'text' || (!node.type && typeof node.text === 'string')) {
    return renderTextNode(node, key)
  }

  // Children rendering
  const children = Array.isArray(node.children)
    ? node.children.map((child: Node, i: number) => renderNode(child, i))
    : null

  switch (node.type) {
    case 'root':
      return <div key={key}>{children}</div>

    case 'paragraph':
      if (!children || (Array.isArray(children) && children.length === 0)) {
        return <p key={key} className="empty-p"><br /></p>
      }
      return <p key={key}>{children}</p>

    case 'heading': {
      const headingTag = (node.tag || 'h2').toLowerCase()
      if (headingTag === 'h1') return <h1 key={key}>{children}</h1>
      if (headingTag === 'h3') return <h3 key={key}>{children}</h3>
      if (headingTag === 'h4') return <h4 key={key}>{children}</h4>
      if (headingTag === 'h5') return <h5 key={key}>{children}</h5>
      if (headingTag === 'h6') return <h6 key={key}>{children}</h6>
      return <h2 key={key}>{children}</h2>
    }

    case 'list': {
      if (node.listType === 'number' || node.tag === 'ol') {
        return <ol key={key}>{children}</ol>
      }
      return <ul key={key}>{children}</ul>
    }

    case 'listitem':
      return <li key={key}>{children}</li>

    case 'quote':
      return <blockquote key={key}>{children}</blockquote>

    case 'link':
    case 'autolink': {
      const url = node.fields?.url || node.url || '#'
      const target = (node.fields?.newTab || node.newTab) ? '_blank' : undefined
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined
      return (
        <a key={key} href={url} target={target} rel={rel} className="text-primary underline hover:opacity-80">
          {children}
        </a>
      )
    }

    case 'linebreak':
      return <br key={key} />

    default:
      if (children && children.length > 0) {
        return <div key={key}>{children}</div>
      }
      return null
  }
}

export function RichText({ content, className }: RichTextProps) {
  if (!content) {
    return <p className="text-muted-foreground italic">Belum ada konten yang diisi.</p>
  }

  const rootNode = 'root' in content && content.root ? content.root : (content as Node)
  if (!rootNode || !rootNode.children || rootNode.children.length === 0) {
    return <p className="text-muted-foreground italic">Belum ada konten yang diisi.</p>
  }

  return (
    <div
      className={cn(
        'prose prose-slate max-w-none dark:prose-invert',
        'prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white',
        'prose-p:leading-relaxed prose-p:text-slate-700 dark:prose-p:text-slate-300',
        'prose-li:text-slate-700 dark:prose-li:text-slate-300',
        'prose-strong:font-semibold prose-strong:text-slate-900 dark:prose-strong:text-white',
        className
      )}
    >
      {rootNode.children.map((node: Node, i: number) => renderNode(node, i))}
    </div>
  )
}
