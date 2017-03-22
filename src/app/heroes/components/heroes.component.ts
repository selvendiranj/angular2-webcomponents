import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../models/hero.model';
import { HeroService } from '../services/hero.service';

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: '../views/heroes.component.html',
    styleUrls: ['../styles/heroes.component.css']
})

export class HeroesComponent implements OnInit
{

    heroes: Hero[];
    selectedHero: Hero;

    constructor(
        private router: Router,
        private heroService: HeroService
    ) { }

    ngOnInit(): void
    {
        this.getHeroes();
    }

    getHeroes(): void
    {
        this.heroService.getHeroes().then((heroes) =>
        {
            this.heroes = heroes;
        });
    }

    onSelect(hero: Hero): void
    {
        this.selectedHero = hero;
    }

    gotoDetail(): void
    {
        this.router.navigate(['/heroes/detail', this.selectedHero.id]);
    }

    add(name: string): void
    {
        name = name.trim();
        if (!name) { return; }
        this.heroService.create(name)
            .then(hero =>
            {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }

    delete(hero: Hero): void
    {
        this.heroService.delete(hero.id)
            .then(() =>
            {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            });
    }
}