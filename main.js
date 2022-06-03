// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}
console.log(returnRandBase())

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      // random mutation in dna
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase(); 
      } 
      this.dna[randIndex] = newBase;
      return this.dna
      },
    compareDNA(otherOrg) {
      const similarities = this.dna.reduce((acc, curr, idx, arr) => {
        if(arr[idx] === otherOrg.dna[idx]) {
            return ++acc;
          } else {
          return acc;
        }
      }, 0);
        const percentOfDNAshared = (similarities / this.dna.length) * 100;
         const percentageTo2Deci = percentOfDNAshared.toFixed(2);
        console.log(`${this.specimenNum} and ${otherOrg.specimenNum} have ${percentageTo2Deci}% of DNA in common.`)
      },
    willLikelySurvive() {
      const cOrG = this.dna.filter(el => el === 'C' || el === 'G');
      return cOrG.length / this.dna.length >= 0.6;
    }
    }
  };

  const survivingSpecimen = [];
  let idCounter = 1;

  while(survivingSpecimen.length < 30) {
  let newOrg = pAequorFactory(idCounter,mockUpStrand())
  if (newOrg.willLikelySurvive() === true) {
    survivingSpecimen.push(newOrg);
  }
  idCounter++
  };

const pAequorOne = pAequorFactory(1,mockUpStrand()); 
const pAequorTwo = pAequorFactory(2,mockUpStrand());

console.log(`DNA of specimen #${pAequorOne.specimenNum}: [${pAequorOne.dna}]`);

console.log(`DNA of specimen #${pAequorTwo.specimenNum}: [${pAequorTwo.dna}]`);

pAequorOne.compareDNA(pAequorTwo);

console.log(`P.aequor will survive: ${pAequorOne.willLikelySurvive()}`);

console.log(survivingSpecimen)










