import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../database/entity/User';
import { Taskboard } from '../database/entity/Taskboard';
import { Project } from '../database/entity/Project';
import { Card } from '../database/entity/Card';
import { Github } from '../database/entity/Github';
import { User } from '../interfaces/models/User';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
	findByEmail(email: string): Promise<Users|undefined> {
		return this.findOne({email: email});
	}

	async findProjectsForUser(id: number): Promise<Project[]> {
		const user = await this.findOne(id, {
			relations: ['projects']
		});
		return user!.projects!;
	}

	async findBoardsForUser(id: number): Promise<Taskboard[]> {
		const user = await this.findOne(id, {
			relations: ['boards']
		});
		return user!.boards!;
	}

	async findUserCards(id: number): Promise<Card[]> {
		const user = await this.findOne(id, {
			relations: ['cards']
		});
		return user!.cards!;
	}

	async getGithubProfle(id: number): Promise<Github> {
		const user = await this.findOne(id, {
			relations: ['github']
		});
		return user!.github!;
	}

	async addGithubProfile(profile: Github, id: number): Promise<Users|void> {
		const user = await this.findOne(id);
		if (user) {
			user.github = profile;
			await this.save(user);
			return user;
		}
	}

	async addUser(user: Users): Promise<Users> {
		return this.save(user);
	}
}
