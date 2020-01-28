# Timetable configured

  * Interfață web pentru configurarea orarului.
  
  * Fișa cerințelor poate fi accesată [aici](https://docs.google.com/document/d/1TyRxXVLbTt_B6FdEuDm4efVG_GshRjGz5qQErifN-x0/edit?copiedFromTrash)
  * Componentele proiectului și împărțirea lor pe echipe poate fi vizualizată [aici](https://docs.google.com/document/d/1poCj_TqRzKDyyeCXENtJrI7LdDNoxzUGo3STQt-k4vo/edit?copiedFromTrash)
  
## About / Synopsis

* Artificial Intelligence @ Faculty of Computer Science Iasi
* Project status: Done, we hope.

## Table of contents

> * [Timetable configured](#timetable-configured)
>   * [About / Synopsis](#about--synopsis)
>   * [Table of contents](#table-of-contents)
>   * [Usage](#usage)
>   * [Requirements](#requirements)
>     * [Content](#content)
>     * [Deploy (how to install build product)](#deploy-how-to-install-build-product)
>   * [Resources (Documentation and other links)](#resources-documentation-and-other-links)

## Usage

Usage

1. Clone the repo
2. Open up the program


## Requirements
*  Administratorul configurează intervale orare și săli disponibile, precum și o listă de materii și numărul de cursuri și seminarii. Utilizatorii văd evenimentele asociate lor și configurează restricții pentru fiecare privind sala și intervalele orare, cu posibilitatea de a marca restricții (constrângeri hard și soft). Utilizatorii pot vedea conflictele create în urma constrângerilor lor (de exemplu, suprapunerea unui eveniment în aceeași sală la aceeași oră).


### Content

* One required database containing CourseTable(course name, features, type, profs name, room name, features, type), RoomsTable(room name, features, type), UserTable(userName, password, type)

### Deploy (how to install build product)
* Nodejs for frontend
* Yarn for backend

## Resources (Documentation and other links)

* https://legacy.yarnpkg.com/en/
* https://reactjs.org/
* https://www.w3schools.com/
