import { Slug } from './values-object/slug'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/@types/optional'
import dayjs from 'dayjs'

interface QuestionProps {
  title: string
  content: string
  authorId: UniqueEntityId
  slug: Slug
  bestAnswerId?: UniqueEntityId
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  get content() {
    return this.props.content
  }

  get title() {
    return this.props.title
  }

  get slug() {
    return this.props.slug
  }
  get authorId() {
    return this.props.authorId
  }
  get bestAnswerId() {
    return this.props.bestAnswerId
  }
  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    return this.content.substring(0,120).trimEnd().concat("...")
  }
  private touch() {
    this.props.updatedAt = new Date()
  }


  set title (title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }
  set content (content: string) {
    this.props.content = content
    this.touch()
  }
 set bestAnswerId(bestAnswerId: UniqueEntityId | undefined){
  this.props.bestAnswerId = bestAnswerId
 }

  static create(props: Optional<QuestionProps, 'createdAt' | 'slug'>, id?: UniqueEntityId) {
    const question = new Question({
      ...props,
      slug: props.slug ?? Slug.createFromText(props.title),
      createdAt: new Date()
    }, id)

    return question
  }
}
