import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MovieModel } from 'src/core/interface/movies.model';
import { AdminService } from 'src/core/service/admin/admin.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent {
  filmeForm!: FormGroup;
  coverImage!: File;
  file!: any;
  cadastroForm!: FormGroup;
  genres: any[] = [];
  directors: any[] = [];
  actors: any[] = [];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForms();
    this.getAttributes();
  }
  initializeForms() {
    this.filmeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required],
      coverImage: [''],
      releaseYear: ['', Validators.required],
      genres: this.fb.array([this.fb.control('')]),
      directors: this.fb.array([this.fb.control('')]),
      actors: this.fb.array([this.fb.control('')]),
    });
    this.cadastroForm = this.fb.group(
      {
        genresName: [''],
        directorName: [''],
        actorName: [''],
      },
      { validators: [this.checkAtLeastOneField, this.checkFields] }
    );
  }
  getAttributes() {
    this.adminService.getAtributes().subscribe((res: any) => {
      this.genres = res.data.genres;
      this.directors = res.data.directors;
      this.actors = res.data.actors;
    });
  }
  // addgenresName() {
  //   const genresName = this.cadastroForm.get('genresName')?.value;
  //   if (genresName) {
  //     (this.filmeForm.get('genres') as FormArray).push(
  //       this.fb.control(genresName)
  //     );
  //     this.cadastroForm.get('genresName')?.reset();
  //   }
  // }

  // // Adicionar novo diretor
  // addDirectorname() {
  //   const directorName = this.cadastroForm.get('directorName')?.value;
  //   if (directorName) {
  //     (this.filmeForm.get('directors') as FormArray).push(
  //       this.fb.control(directorName)
  //     );
  //     this.cadastroForm.get('directorName')?.reset();
  //   }
  // }

  // // Adicionar novo ator/atriz
  // addactorName() {
  //   const actorName = this.cadastroForm.get('actorName')?.value;
  //   if (actorName) {
  //     (this.filmeForm.get('actors') as FormArray).push(
  //       this.fb.control(actorName)
  //     );
  //     // this.cadastroForm.get('actorName')?.reset();
  //   }
  // }

  get genreForms() {
    return this.filmeForm.get('genres') as FormArray;
  }

  addGenre() {
    this.genreForms.push(this.fb.control(''));
  }
  removeGenre(index: number) {
    this.genreForms.removeAt(index);
  }
  get directorForms() {
    return this.filmeForm.get('directors') as FormArray;
  }

  addDirector() {
    this.directorForms.push(this.fb.control(''));
  }
  removeDirector(index: number) {
    this.directorForms.removeAt(index);
  }
  get actorForms() {
    return this.filmeForm.get('actors') as FormArray;
  }

  addActor() {
    this.actorForms.push(this.fb.control(''));
  }
  removeActor(index: number) {
    this.actorForms.removeAt(index);
  }
  onFileSelected(event: any) {

    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    this.file = formData;
    // this.adminService.teste(formData).subscribe((res: any)=>{})
    this.filmeForm.patchValue({
      coverImage: event.target.files[0],
    });
  }
  checkAtLeastOneField(formGroup: FormGroup) {
    const values = Object.values(formGroup.controls).map(
      (control: AbstractControl) => control.value
    );
    const hasAtLeastOneField = values.some((value) => value?.length >= 2);

    return hasAtLeastOneField ? null : { noFieldFilled: true };
  }

  checkFields(formGroup: FormGroup) {
    const values = Object.values(formGroup.controls).map(
      (control: AbstractControl) => control.value
    );
    const areAllFieldsEmpty = values.every((value) => !value);

    return areAllFieldsEmpty ? { allFieldsEmpty: true } : null;
  }
  onSubmit() {
    if (this.filmeForm.valid) {
      if (this.file) {
        this.adminService.imageUpload(this.file).subscribe((res: any) => {
          const filme: any = {
            name: this.filmeForm.value.name,
            description: this.filmeForm.value.description,
            duration: this.filmeForm.value.duration,
            ratings: this.filmeForm.value.ratings,
            releaseYear: this.filmeForm.value.releaseYear,
            coverImage: res.imageName,
            genres: this.filmeForm.value.genres.map((genre: string) => {
              return { genresName: genre };
            }),
            directors: this.filmeForm.value.directors.map(
              (director: string) => {
                return { directorName: director };
              }
            ),
            actors: this.filmeForm.value.actors.map((actor: string) => {
              return { actorName: actor };
            }),
          };
          this.adminService.registerMovie(filme).subscribe((res: any) => {
            if (!res.erro) {
              this.filmeForm.reset();
              this.router.navigate(['admin/list-movie']);
            } else {
            }
          });
        });
      } else {
        const filme: any = {
          name: this.filmeForm.value.name,
          description: this.filmeForm.value.description,
          duration: this.filmeForm.value.duration,
          ratings: this.filmeForm.value.ratings,
          releaseYear: this.filmeForm.value.releaseYear,
          coverImage: '',
          genres: this.filmeForm.value.genres.map((genre: string) => {
            return { genresName: genre };
          }),
          directors: this.filmeForm.value.directors.map((director: string) => {
            return { directorName: director };
          }),
          actors: this.filmeForm.value.actors.map((actor: string) => {
            return { actorName: actor };
          }),
        };
        this.adminService.registerMovie(filme).subscribe((res: any) => {
          if (!res.erro) {
            this.filmeForm.reset();
            this.router.navigate(['admin/list-movie']);
          } else {
          }
        });
      }
    }
  }

  onCadastroSubmit() {
    if (this.cadastroForm.valid) {
      this.adminService
        .newsAtributtes(this.cadastroForm.value)
        .subscribe((res: any) => {
          if (!res.error) {
            this.getAttributes();
            this.cadastroForm.reset();
          }
        });
    }
  }
}
