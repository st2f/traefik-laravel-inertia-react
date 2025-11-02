import { render, screen, act } from '@testing-library/react';
import CodeHighlight from '../CodeHighlight';

describe('CodeHighlight component', () => {

    it('renders inline code correctly', async () => {   // <-- async added
        await act(async () => {
            render(<CodeHighlight codeToHighlight="`inline code`" />);
        });
        expect(screen.getByText('inline code')).toBeInTheDocument();
    });

    it('renders syntax-highlighted code block', async () => {
        await act(async () => {
            render(
                <CodeHighlight codeToHighlight={'```javascript\nconsole.log("hello")\n```'} />
            );
        });

        const codeBlock = document.querySelector('pre code');
        expect(codeBlock).toBeTruthy();
        expect(codeBlock.textContent).toContain('console.log("hello")');
    });

});
