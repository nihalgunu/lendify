'use client';

import { useState } from 'react';
import Navbar from '../navbar/Navbar'; // Import the Navbar component

interface Proposal {
    id: number;
    title: string;
    content: string;
    yes: number;
    no: number;
    votes: { userId: string; vote: 'yes' | 'no' }[];
}

const userId = 'user-123'; // Assume a static user ID for this example

const Governance = () => {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [draftTitle, setDraftTitle] = useState('');
    const [draftContent, setDraftContent] = useState('');
    const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

    const submitProposal = () => {
        const newProposal: Proposal = {
            id: proposals.length + 1,
            title: draftTitle,
            content: draftContent,
            yes: 0,
            no: 0,
            votes: [],
        };
        setProposals([...proposals, newProposal]);
        setDraftTitle('');
        setDraftContent('');
    };

    const vote = (id: number, type: 'yes' | 'no') => {
        setProposals(proposals.map(proposal => {
            if (proposal.id === id) {
                const existingVote = proposal.votes.find(vote => vote.userId === userId);
                if (existingVote) {
                    if (existingVote.vote === type) return proposal; // If the vote is the same, do nothing
                    // Change the vote type
                    existingVote.vote = type;
                    proposal[type]++;
                    proposal[type === 'yes' ? 'no' : 'yes']--;
                } else {
                    // Add a new vote
                    proposal.votes.push({ userId, vote: type });
                    proposal[type]++;
                }
            }
            return proposal;
        }));
    };

    const calculatePercentage = (proposal: Proposal) => {
        const totalVotes = proposal.yes + proposal.no;
        if (totalVotes === 0) return { yes: '0.00', no: '0.00' };
        return {
            yes: ((proposal.yes / totalVotes) * 100).toFixed(2),
            no: ((proposal.no / totalVotes) * 100).toFixed(2),
        };
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Add the Navbar at the top */}
            <Navbar />
            
            <div className="container mx-auto mt-10">
                <div className="card max-w-lg mx-auto bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Draft a Proposal</h2>
                        <input
                            type="text"
                            className="input input-bordered w-full mb-4"
                            placeholder="Proposal Title"
                            value={draftTitle}
                            onChange={(e) => setDraftTitle(e.target.value)}
                            required
                        />
                        <textarea 
                            className="textarea textarea-bordered w-full" 
                            placeholder="Write your proposal here..."
                            value={draftContent}
                            onChange={(e) => setDraftContent(e.target.value)}
                            required
                        ></textarea>
                        <button className="btn btn-primary mt-4" onClick={submitProposal}>Submit Proposal</button>
                    </div>
                </div>
                <div className="mt-10">
                    <h2 className="text-2xl mb-4">Proposals</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Yes (%)</th>
                                    <th>No (%)</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proposals.map(proposal => (
                                    <tr
                                        key={proposal.id}
                                        onClick={() => setSelectedProposal(proposal)}
                                        className="hover:bg-gray-100 cursor-pointer"
                                    >
                                        <td>{proposal.id}</td>
                                        <td>{proposal.title}</td>
                                        <td>{calculatePercentage(proposal).yes}%</td>
                                        <td>{calculatePercentage(proposal).no}%</td>
                                        <td>
                                            <button
                                                className="btn btn-success btn-xs"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    vote(proposal.id, 'yes');
                                                }}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                className="btn btn-error btn-xs ml-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    vote(proposal.id, 'no');
                                                }}
                                            >
                                                No
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {selectedProposal && (
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <h2 className="font-bold text-lg">{selectedProposal.title}</h2>
                            <p className="py-4">{selectedProposal.content}</p>
                            <div className="modal-action">
                                <button className="btn" onClick={() => setSelectedProposal(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Governance;
