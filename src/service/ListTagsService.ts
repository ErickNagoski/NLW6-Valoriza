import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import {classToPlain} from "class-transformer";

class ListTagService{
    async execute(){
        const tagsRespositories = getCustomRepository(TagsRepositories);

        const tags = await tagsRespositories.find();

        return classToPlain(tags);
    }
}

export {ListTagService};