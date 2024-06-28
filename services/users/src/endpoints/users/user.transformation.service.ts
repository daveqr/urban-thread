import {TransformationService} from '../transformation.service';
import {injectable} from "tsyringe";
import User from "../../core/models/user.model";
import {Link} from "../hateoas.interfaces";

function createSelfLink(baseUrl: string, resourceId: string | undefined): Link {
    const href = `${baseUrl}/${resourceId}`;
    return {href};
}

@injectable()
export class UserTransformationService implements TransformationService<User, any> {
    transform(user: User): any {
        return {
            ...user,
            _links: {
                self: createSelfLink("/users", user.id),
            },
            _embedded: {
                // products: category.productLinks,
            },
        };
    }
}