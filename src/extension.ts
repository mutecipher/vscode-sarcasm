import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vscode-sarcasm.addSarcasm', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			let selection = editor.selection;

			let word: string;

			if (selection.isEmpty) {
				selection = new vscode.Selection(0, 0, document.lineCount, 0);
			}

			word = document.getText(selection);

			editor.edit(editBuilder => {
				editBuilder.replace(selection, injectSarcasm(word));
			});
		}
	});

	context.subscriptions.push(disposable);
}

function injectSarcasm(text: string): string {
	let stringLength = text.length;
	let sarcastic: string = "";
	for (let i = 0; i < stringLength; i++) {
		sarcastic = sarcastic.concat(i % 2 === 0 ? text.charAt(i) : text.charAt(i).toUpperCase());
	}
	return sarcastic;
}