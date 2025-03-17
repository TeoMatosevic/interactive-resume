import { Block } from '.'

export default interface QueryResult {
    blocks: Block[]
    markdown: string | null
}
