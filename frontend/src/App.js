import "./App.css";
import idl from "./idl.json";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import {
	Program,
	AnchorProvider,
	web3,
	utils,
	BN,
} from "@project-serum/anchor";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import CampaignItem from './CampaignItem'; 
import Header from './Header';
import "./HomePage.css"
import StartCampaign from './StartCampaign';
import ManageCampaigns from "./ManageCampaigns";
import EditCampaign from "./EditCampaign";
window.Buffer = Buffer;

const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl("devnet");
const opts = {
	preflightCommitment: "processed",
};
const { SystemProgram } = web3;

const App = () => {
	const [walletAddress, setWalletAddress] = useState(null);
	const [campaigns, setCampaigns] = useState([]);

	const [view, setView] = useState('home');

	const onNavigate = (newView) => {
			if (newView === 'explore') {
					getCampaigns();
			}
			setView(newView);
	};

	const getProvider = () => {
		const connection = new Connection(network, opts.preflightCommitment);
		const provider = new AnchorProvider(
			connection,
			window.solana,
			opts.preflightCommitment
		);
		return provider;
	};
	const checkIfWalletIsConnected = async () => {
		try {
			const { solana } = window;
			if (solana) {
				if (solana.isPhantom) {
					console.log("Phantom wallet found!");
					const response = await solana.connect({
						onlyIfTrusted: true,
					});
					console.log(
						"Connected with public key:",
						response.publicKey.toString()
					);
					setWalletAddress(response.publicKey.toString());
				}
			} else {
				alert("Solana object not found! Get a Phantom wallet");
			}
		} catch (error) {
			console.error(error);
		}
	};
	const connectWallet = async () => {
		const { solana } = window;
		if (solana) {
			const response = await solana.connect();
			console.log(
				"Connected with public key:",
				response.publicKey.toString()
			);
			setWalletAddress(response.publicKey.toString());
		}
	};

	const getCampaigns = async () => {
		const connection = new Connection(network, opts.preflightCommitment);
		const provider = getProvider();
		const program = new Program(idl, programID, provider);
		Promise.all(
			(await connection.getProgramAccounts(programID)).map(
				async (campaign) => ({
					...(await program.account.campaign.fetch(campaign.pubkey)),
					pubkey: campaign.pubkey,
				})
			)
		).then((campaigns) => setCampaigns(campaigns));
	};
	const handleCreateCampaign = (name, description) => {
    // Add logic to create a campaign
    console.log('Creating campaign:', name, description);
    createCampaign(name, description); // Existing createCampaign function
  };
	const createCampaign = async (name, description) => {
		try {
			const provider = getProvider();
			const program = new Program(idl, programID, provider);
			const [campaign] = await PublicKey.findProgramAddress(
				[
					utils.bytes.utf8.encode("CAMPAIGN_DEMO"),
					provider.wallet.publicKey.toBuffer(),
				],
				program.programId
			);
			await program.rpc.create(name, description, {
				accounts: {
					campaign,
					user: provider.wallet.publicKey,
					systemProgram: SystemProgram.programId,
				},
			});
			console.log(
				"Created a new campaign w/ address:",
				campaign.toString()
			);
		} catch (error) {
			console.error("Error creating campaign account:", error);
		}
	};

	// Function to edit campaign details
	const editCampaign = async (campaignPublicKey, newName, newDescription) => {
		
	};

	// Function to delete a campaign
	const deleteCampaign = async (campaignPublicKey) => {
		// Smart contract call to delete the campaign
	};

	const [isEditing, setIsEditing] = useState(false);
	const [editingCampaign, setEditingCampaign] = useState(null);

	const startEditing = (campaign) => {
		setEditingCampaign(campaign);
		setIsEditing(true);
	};

	const cancelEditing = () => {
		setIsEditing(false);
		setEditingCampaign(null);
	};

	const saveEdit = (campaignPublicKey, newName, newDescription) => {
		editCampaign(campaignPublicKey, newName, newDescription);
		setIsEditing(false);
		setEditingCampaign(null);
		// Refresh the campaign list
	};

	const donate = async (publicKey) => {
		try {
			const provider = getProvider();
			const program = new Program(idl, programID, provider);

			await program.rpc.donate(new BN(0.2 * web3.LAMPORTS_PER_SOL), {
				accounts: {
					campaign: publicKey,
					user: provider.wallet.publicKey,
					systemProgram: SystemProgram.programId,
				},
			});
			console.log("Donated some money to:", publicKey.toString());
			getCampaigns();
		} catch (error) {
			console.error("Error donating:", error);
		}
	};

	const withdraw = async (publicKey) => {
		try {
			const provider = getProvider();
			const program = new Program(idl, programID, provider);
			await program.rpc.withdraw(new BN(0.2 * web3.LAMPORTS_PER_SOL), {
				accounts: {
					campaign: publicKey,
					user: provider.wallet.publicKey,
				},
			});
			console.log("Withdrew some money from:", publicKey.toString());
		} catch (error) {
			console.error("Error withdrawing:", error);
		}
	};

	const renderHomeContent = () => (
		<div className="home-content">
    <h1>Welcome to Our Crowdfunding Platform</h1>
    <p>Discover and support amazing projects or start your own campaign to bring your ideas to life.</p>
    
    {/* "Start a Campaign" Button */}
    <div className="start-campaign-button">
      <button onClick={() => onNavigate('create')}>Start a Campaign</button>
    </div>

    <h2>How It Works</h2>
    <ol>
      <li>Create your campaign.</li>
      <li>Share your story.</li>
      <li>Receive funds and make your project a reality.</li>
    </ol>

    <div className="call-to-action">
      <button onClick={() => onNavigate('explore')}>Explore Campaigns</button>
    </div>
  </div>
	);

	const renderNotConnectedContainer = () => (
		<button onClick={connectWallet}>Connect to Wallet</button>
	);
	
	const renderConnectedContainer = () => {
		switch (view) {
				case 'create':
					return <StartCampaign onCreateCampaign={handleCreateCampaign} />;
				case 'explore':
						return (
								<div className="campaigns-list">
										{campaigns.map((campaign) => (
												<CampaignItem 
														key={campaign.pubkey.toString()} 
														campaign={campaign} 
														onDonate={donate} 
														onWithdraw={withdraw}
												/>
										))}
								</div>
						);
				case 'manage':
					return (
						<>
						<ManageCampaigns
							campaigns={campaigns}
							onEdit={startEditing}
							onDelete={deleteCampaign}
							onWithdraw={withdraw}
						/>
						{isEditing && (
							<EditCampaign
								campaign={editingCampaign}
								onSaveEdit={saveEdit}
								onCancel={cancelEditing}
							/>
						)}		
						</>
						
					);
				default:
						return renderHomeContent();
		}
};
	useEffect(() => {
		const onLoad = async () => {
			await checkIfWalletIsConnected();
		};
		window.addEventListener("load", onLoad);
		return () => window.removeEventListener("load", onLoad);
	}, []);

	return (
		<div className="App">
            <Header onNavigate={onNavigate} />
						<div className="main-content">
						{!walletAddress && renderNotConnectedContainer()}
            {walletAddress && renderConnectedContainer()}
						</div>
            
        </div>
	);
};

export default App;


// Edit Campaign Name 
// Edit Campaign Description
// View Own Campaign

// Stretch:
// User total donation, 