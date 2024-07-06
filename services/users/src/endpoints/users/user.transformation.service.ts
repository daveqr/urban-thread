import { TransformationService } from "../transformation.service";
import { injectable } from "tsyringe";
import User from "../../core/models/user.model";
import { Link } from "../hateoas.interfaces";

function createSelfLink(baseUrl: string, resourceId: string | undefined): Link {
  const href = `${baseUrl}/${resourceId}`;
  return { href };
}

export interface TransformedUser extends User {
  _links: {
    self: Link;
  };
  _embedded: Record<string, never>;
}

@injectable()
export class UserTransformationService
  implements TransformationService<User, TransformedUser>
{
  transform(user: User): TransformedUser {
    return {
      ...user,
      _links: {
        self: createSelfLink("/users", user.id),
      },
      _embedded: {
        // products: category.productLinks,
      },
    } as TransformedUser;
  }
}
