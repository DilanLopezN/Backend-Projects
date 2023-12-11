import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";



interface StudendProps {
  name: string;
}

class Student extends Entity<StudendProps> {


  static create(props: StudendProps, id?: UniqueEntityId) {
    const student = new Student({
      ...props,
    }, id)

    return student
  }

}