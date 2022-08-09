module.exports = {
  atividade: function (pet, atividade_quiz) {
    return new Promise((resolve) => {
      let point = 0;

      if (atividade_quiz !== 0) {
        if (atividade_quiz >= 3 && atividade_quiz < 5) {
          pet.temperamento_pet.forEach((element) => {
            switch (element) {
              case "BRINCALHAO":
                point++;
                break;
              case "CALMO":
                point--;
                break;
              default:
                break;
            }
          });
        } else if (atividade_quiz < 3 && atividade_quiz > 1) {
          pet.temperamento_pet.forEach((element) => {
            switch (element) {
              case "BRINCALHAO":
                point--;
                break;
              case "CALMO":
                point++;
                break;
              default:
                break;
            }
          });
        } else if (atividade_quiz == 5) {
          pet.temperamento_pet.forEach((element) => {
            switch (element) {
              case "BRINCALHAO":
                point += 2;
                break;
              case "CALMO":
                point -= 2;
                break;
              default:
                break;
            }
          });
        } else if (atividade_quiz == 1) {
          pet.temperamento_pet.forEach((element) => {
            switch (element) {
              case "BRINCALHAO":
                point -= 2;
                break;
              case "CALMO":
                point += 2;
                break;
              default:
                break;
            }
          });
        }
      }

      resolve(point);
    });
  },
  disponibilidade: function (pet, disponibilidade_quiz) {
    return new Promise((resolve) => {
      let point = 0;

      if (disponibilidade_quiz !== 0) {
        if (disponibilidade_quiz >= 3 && disponibilidade_quiz < 5) {
          pet.temperamento_pet.forEach((element) => {
            switch (element) {
              case "CARENTE":
                point++;
                break;
              case "BRINCALHAO":
                point++;
                break;
              case "ARISCO":
                point++;
                break;
              default:
                break;
            }
          });
        } else if (disponibilidade_quiz < 3 && disponibilidade_quiz > 1) {
          pet.temperamento_pet.forEach((element) => {
            switch (element) {
              case "CARENTE":
                point--;
                break;
              case "BRINCALHAO":
                point--;
                break;
              case "ARISCO":
                point--;
                break;
              case "INDEPENDENTE":
                point++;
                break;
              default:
                break;
            }
          });
        } else if (disponibilidade_quiz == 5) {
          pet.temperamento_pet.forEach((element) => {
            switch (element) {
              case "CARENTE":
                point += 2;
                break;
              case "BRINCALHAO":
                point += 2;
                break;
              case "ARISCO":
                point += 2;
                break;
              default:
                break;
            }
          });
        } else if (disponibilidade_quiz == 1) {
          pet.temperamento_pet.forEach((element) => {
            switch (element) {
              case "CARENTE":
                point -= 2;
                break;
              case "BRINCALHAO":
                point -= 2;
                break;
              case "ARISCO":
                point -= 2;
                break;
              case "INDEPENDENTE":
                point += 2;
                break;
              default:
                break;
            }
          });
        }
      }

      resolve(point);
    });
  },
  casa: function (pet, casa_quiz) {
    return new Promise((resolve) => {
      let point = 0;

      if (casa_quiz !== "TODOS") {
        if (casa_quiz === "CASA") {
          if (pet.casa_pet.includes("CASA")) {
            point++;
          } else {
            point--;
          }
        }
        if (casa_quiz === "APARTAMENTO") {
          if (pet.casa_pet.includes("APARTAMENTO")) {
            point++;
          } else {
            point--;
          }
        }
      }

      resolve(point);
    });
  },
  social: function (pet, social_quiz) {
    let point = 0;

    const { cao_pet_quiz, gato_pet_quiz, outros_pets_quiz, criancas_quiz } =
      social_quiz;

    if (
      (cao_pet_quiz && pet.sociavel_pet.includes("CAO")) ||
      pet.sociavel_pet.includes("CACHORRO")
    ) {
      pet.temperamento_pet.includes("AGRESSIVO") ? point-- : point++;
    }

    if (gato_pet_quiz && pet.sociavel_pet.includes("GATO")) {
      pet.temperamento_pet.includes("AGRESSIVO") ? point-- : point++;
    }

    if (criancas_quiz && pet.sociavel_pet.includes("CRIANCAS")) {
      pet.temperamento_pet.includes("AGRESSIVO") ? point-- : point++;
    }
  },
};
