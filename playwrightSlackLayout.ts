import { Block, KnownBlock } from '@slack/types';
import { SummaryResults } from 'playwright-slack-report/dist/src';

/**
 * @function generateCustomLayout is a custom slack message template for playwright report
 * @param summaryResults
 * @returns Array of Slack message template
 */

function generateCustomLayout(
	summaryResults: SummaryResults
): Array<KnownBlock | Block> {
	const meta: { type: string; text: { type: string; text: string } }[] = [];
	if (summaryResults.meta) {
		for (let i = 0; i < summaryResults.meta.length; i += 1) {
			const { key, value } = summaryResults.meta[i];
			meta.push({
				type: 'section',
				text: {
					type: 'mrkdwn',
					text: `\n*${key}* :\t${value}`,
				},
			});
		}
	}
	return [
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: summaryResults.failed === 0 ? ':tada: All tests passed!' : `😭${summaryResults.failed} failure(s) out of ${summaryResults.tests.length} tests`,
			},
		},
		...meta,
	];
}

/**
 * @function generateSlackReport is a custom slack message template for playwright report
 * @param summaryResults
 * @returns Array of Slack message template
 *
 * @author Teerapong Singthong
 */
function generateSlackReport(summaryResults: SummaryResults): Array<KnownBlock | Block> {
	// Defines result array
	const maxNumberOfFailures = 33;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const fails: any[] = [];

	// header
	const header = {
		type: 'header',
		text: {
			type: 'plain_text',
			text: '🎭 Playwright Test Results for DEMO',
			emoji: true,
		},
	};

	// summary section
	const summary = {
		type: 'section',
		text: {
			type: 'mrkdwn',
			text:
				summaryResults.failed === 0
					? `:tada: All *${summaryResults.passed}* tests passed!`
					: `✅ Passed: *${summaryResults.passed}* | ❌ Failed: *${summaryResults.failed}*` + (summaryResults.skipped > 0 ? ` | Skipped: :new_moon: *${summaryResults.skipped}*` : '')

		},
	};

	for (let i = 0; i < summaryResults.failures.length; i += 1) {
		const { test } = summaryResults.failures[i];
		fails.push({
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: `:ladybug: *${test}*`,
			},
		});
		if (i > maxNumberOfFailures) {
			fails.push({
				type: 'section',
				text: {
					type: 'mrkdwn',
					text: '*There are too many failures to display, view the full results in BuildKite*',
				},
			});
			break;
		}
	}

	// meta section
	const meta: { type: string; text: { type: string; text: string } }[] = [];
	if (summaryResults.meta) {
		for (let i = 0; i < summaryResults.meta.length; i += 1) {
			const { key, value } = summaryResults.meta[i];
			meta.push({
				type: 'section',
				text: {
					type: 'mrkdwn',
					text: `\n*${key}*: ${value}`,
				},
			});
		}
	}

	return [
		header,
		summary,
		...meta,
		{ type: 'divider' },
		...fails,
	];
}

export { generateCustomLayout, generateSlackReport };