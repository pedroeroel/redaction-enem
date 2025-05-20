"use client"
export default function Home() {

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const essay = (form.elements.namedItem('essay') as HTMLTextAreaElement).value;
    const essayTitle = (form.elements.namedItem('essayTitle') as HTMLInputElement).value;
    if (!essay) {
      alert('Please enter an essay');
      return;
    }
    if (!essayTitle) {
      alert('Please enter an essay title');
      return;
    }
    if (essay.length < 400) {
      alert('Essay must be at least 400 characters long');
      return;
    }
    const response = await fetch('https://the-learners-dream.vercel.app/api/ENEM', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "essay": essay,
        "essayTitle": essayTitle
      }
      ),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
      return;
    } else  {
      const resultContainer = document.querySelector('#result') as HTMLDivElement;

      resultContainer.innerHTML = `
        <h2 class="text-2xl font-semibold">Results:</h2>
        <p class="text-lg">Your general score was <span className="text-2xl font-bold">${data.generalGrade}</span></p>
        <p class="text-lg">General Comment: ${data.comments[5]}</p>
    
        <ul class="list-disc pl-5 flex flex-col gap-2">
          <li class="text-lg">Competency 1 - ${data.competencies[0]} - ${data.comments[0]}</li>
          <li class="text-lg">Competency 2 - ${data.competencies[1]} - ${data.comments[1]}</li>
          <li class="text-lg">Competency 3 - ${data.competencies[2]} - ${data.comments[2]}</li>
          <li class="text-lg">Competency 4 - ${data.competencies[3]} - ${data.comments[3]}</li>
          <li class="text-lg">Competency 5 - ${data.competencies[4]} - ${data.comments[4]}</li>
        </ul>
          `;
      return;
    }
  }


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 sm:p-20">
        <header className="flex w-full justify-center py-10 flex-col items-center gap-3">
          <h1 className='text-4xl'>ENEM</h1>
        <p className="text-lg text-center">
          A simple tool to grade your essays for the ENEM exam
        </p>
        </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-xl">
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={ handleSubmit }
        >
          <label htmlFor="essayTitle" className="font-semibold">Essay Title:</label>
          <textarea
            id="essayTitle"
            name="essayTitle"
            required
            rows={1}
            className="border rounded p-2 w-full"
            placeholder="Cool essay about the future of AI..."
          />
          <label htmlFor="essay" className="font-semibold">Essay Content:</label>
          <textarea
            id="essay"
            name="essay"
            required
            rows={10}
            className="border rounded p-2 w-full"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Assess
          </button>
        </form>

        <section id='result' className="flex flex-col gap-2"></section>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://aistudio.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gemini API
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://linkedin.com/in/pedroedroel/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/pedroeroel"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </footer>
      </div>
    
  );
}
