const fs = require('fs');

const rawData = `qwen3	0.6b	522 MB	Alibaba									0.489	0.434	6274.72 ms	0.548	0.622	1	0.856	0.502
deepseek-r1	1.5b	1.1 GB	Deepseek									0.465	0.469	8752.84 ms	0.555	0.607	0.97	0.771	0.486
qwen3	0.6b	522 MB	Alibaba									0.637	0.653	4268.31 ms	0.722	0.541	0.74	0.887	0.56
deepseek-r1	1.5b	1.1 GB	Deepseek									0.535	0.583	7714.98 ms	0.667	0.562	0.815	0.782	0.515
llama3.2	1.0b	1.3 GB	Meta									0.82	0.652	3956.92 ms	0.721	0.54	0.76	0.915	0.604
llama2.0	1.0b	1.3 GB	Meta									0.805	0.654	17867.46 ms	0.723	0.541	0.74	0.907	0.594
phi-3	3.8b	2.2 GB	Microsoft									0.273	0.2	9997.08 ms	0.36	0.7	0.953	0.512	0.333
qwen2.5	0.5b	397 MB	Alibaba									0.844	0.644	2125.18 ms	0.715	0.547	0.925	0.862	0.627
qwen2.5	0.5b	397 MB	Alibaba									0.686	0.64	2328.67 ms	0.712	0.546	0.82	0.846	0.576
tinyllama	1.1b	637 MB	Open-Source									0.68	0.63	1243.15 ms	0.704	0.548	1	0.771	0.592
deepseek-coder	1.3b	776 MB	Deepseek									0.572	0.633	2095.12 ms	0.707	0.545	0.963	0.773	0.562
smollm	1.7b	990 MB	Hugging Face									0.839	0.448	4643.99 ms	0.558	0.614	1	0.906	0.585
gemma3n	e2b	5.6 GB	Google									0.825	0.636	21745.48 ms	0.709	0.547	0.823	0.895	0.603
lfm2.5-thinking	1.2b	731 MB	Liquid AI									1	0.373	4284.59 ms	0.499	0.636	1	0.936	0.601
granite3-moe	1.0b	821 MB	IBM									0.624	0.693	770.82 ms	0.755	0.526	1	0.939	0.627
stablelm2	1.6b	982 MB	Stability AI									0.543	0.451	2170.74 ms	0.541	0.616	1	0.811	0.513
internlm2	1.8b	1.1 GB	Open-Source									0.579	0.665	1336.49 ms	0.732	0.534	1	0.886	0.599
granite3.2	2.0b	1.5 GB	IBM									0.839	0.508	8568.64 ms	0.607	0.596	0.81	0.843	0.562
yi-coder	1.5b	866 MB	01.AI									0.698	0.615	2167.23 ms	0.693	0.553	0.963	0.817	0.589
ministral-3	3.0b	3.0 GB	Mistral AI									0.674	0.593	9955.05 ms	0.675	0.562	0.864	0.89	0.567
granite3.3	2.0b	1.5 GB	IBM						-0.644			0.967	0.442	2427.70 ms	0.554	0.612	1	0.92	0.614
qwen1.5	0.5b	394 MB	Alibaba									0.331	0.479	723.48 ms	0.563	0.604	0.97	0.753	0.474
smollm2	1.7b	1.8 GB	Hugging Face									0.66	0.656	2845.31 ms	0.725	0.541	0.78	0.878	0.573
phi	2.7b	1.6 GB	Microsoft									0.772	0.609	6541.64 ms	0.687	0.559	0.963	0.88	0.606
interlm2.5	1.8b	3.8 GB	Open-Source									0.63	0.589	7882.98 ms	0.671	0.56	1	0.593	0.534
deepscaler	1.5b	3.6 GB	Agentica									1	0.331	19449.35 ms	0.464	0.651	1	0.883	0.577
granite4	0.35b	708 MB	IBM									0.762	0.536	469.86 ms	0.629	0.579	1	0.704	0.579
gemma3	0.27b	291 MB	Google									0.523	0.666	1108.64 ms	0.733	0.524	1	0.889	0.595
qwen2	0.5b	352 MB	Alibaba									0.537	0.549	1058.55 ms	0.639	0.578	0.872	0.714	0.514
gemma2	2.0b	1.6 GB	Google									0.786	0.51	6095.42 ms	0.609	0.597	1	0.885	0.587
granite3.1-moe	1.0b	1.4 GB	IBM									0.789	0.63	5408.86 ms	0.704	0.55	0.735	0.883	0.582
falcon3	1.0b	1.8 GB	TII									0.732	0.566	4132.38 ms	0.628	0.57	0.925	0.804	0.567
gemma	2.0b	1.7 GB	Google									0.792	0.666	5511.23 ms	0.733	0.534	1	0.879	0.632
granite3-dense	2.0b	1.6 GB	IBM									0.768	0.676	3243.44 ms	0.741	0.525	1	0.943	0.644
stablelm-zephyr	3.0b	1.6 GB	Stability AI									0.727	0.545	2582.55 ms	0.636	0.576	1	0.819	0.58
hermes3	3.0b	2.0 GB	Nous Research									0.567	0.609	4373.97 ms	0.687	0.557	0.91	0.865	0.556
supra-50m-instruct	0.0518b	104 MB	Supra									0.373	0.251	580.87 ms	0.251	0.682	1	0.443	0.358
willow-alpha	0.3b	176 MB	North ML									0.124	0.119	303.33 ms	0.296	0.717	1	0.313	0.282
lfm2	0.35b	229 MB	Liquid AI									0.677	0.449	1696.89 ms	0.56	0.614	0.97	0.849	0.546
bloom-560m	0.8b	1.6 GB	Big Science									0.377	0.227	7540.09 ms	0.231	0.669	1	0.171	0.305
ternary-bonsai	1.7b	3.4 GB	Prism ML									0.914	0.537	13473.13 ms	0.629	0.583	0.81	0.862	0.587
minicpm5	1.0b	688 MB	Open BMB									0	0.108	333.32 ms	0.087	0.704	1	0.415	0.246
medpsy	1.7b	4.1 GB	QVAC									0.902	0.493	28451.96 ms	0.594	0.609	0.81	0.925	0.58
asena-esp32	0.121b	2.7 MB	PROMTECH Inc									0.197	0.061	1676.99 ms	0.249	0.745	1	0.472	0.283
qwen2.5-instruct	1.54b	1.1 GB	Alibaba									0.561	0.5	3478.05 ms	0.58	0.599	0.94	0.745	0.509
vertalily1.2	1.0b	600 MB	VLTX									0.674	0.671	1880.17 ms	0.737	0.536	0.82	0.864	0.586
atem-wisdom	1.5b	986 MB	Open-Source									0.696	0.621	7373.45 ms	0.697	0.557	0.963	0.787	0.579
gemma3-it	1.0b	689 MB	Google									0.654	0.651	8975.29 ms	0.721	0.539	0.887	0.886	0.583
deepseek-r1-distill-qwen	1.5b	1.1 GB	Deepseek									0.696	0.393	9923.71 ms	0.514	0.637	1	0.64	0.498
bonsai	1.7b	248 MB	Prism ML									0.767	0.61	3672.35 ms	0.688	0.555	0.79	0.894	0.584
hunyuan-instruct	1.8b	1.1 GB	Tencent									0.983	0.334	15320.18 ms	0.467	0.653	1	0.821	0.566
onellm-doey-v1	1.0b	1.3 GB	Doey LLM									0.472	0.679	971.98 ms	0.743	0.53	0.962	0.634	0.54
llama3.2-instruct	1.0b	807 MB	Meta									0.472	0.458	3745.51 ms	0.547	0.614	0.97	0.859	0.501
qwen2.5-coder-instruct	3.0b	2.1 GB	Alibaba									0.482	0.661	3428.46 ms	0.728	0.53	0.963	0.771	0.551
phi-4-mini-instruct	4.0b	2.5 GB	Microsoft									0.574	0.485	70451.90 ms	0.575	0.592	0.82	0.692	0.481
qwen3	0.6b	522 MB	Alibaba									0.708	0.665	4413.42 ms	0.732	0.529	0.963	0.862	0.61
qwen3	0.6b	522 MB	Alibaba									0.75	0.678	4342.35 ms	0.743	0.529	1	0.879	0.628
qwen3	0.6b	522 MB	Alibaba									0.804	0.502	3474.34 ms	0.602	0.595	1	0.87	0.589
qwen3	0.6b	522 MB	Alibaba									0.662	0.612	4153.94 ms	0.689	0.559	0.91	0.878	0.578
qwen3	0.6b	522 MB	Alibaba									0.913	0.376	7671.38 ms	0.481	0.635	1	0.876	0.57
qwen3	0.6b	522 MB	Alibaba									0.794	0.691	4346.24 ms	0.753	0.526	1	0.869	0.63
deepseek-r1	1.5b	1.1 GB	Deepseek									0.671	0.639	12237.55 ms	0.81	0.543	1	0.81	0.588
llama3.2	1.0b	1.3 GB	Meta									0.794	0.656	3962.62 ms	0.725	0.537	0.963	0.872	0.624
qwen2.5	0.5b	397 MB	Alibaba									0.844	0.624	4378.73 ms	0.712	0.548	0.925	0.87	0.619
deepseek-r1	1.5b	1.1 GB	Deepseek									0.582	0.605	8756.96 ms	0.684	0.555	1	0.724	0.548
llama3.2	1.0b	1.3 GB	Meta									0.755	0.668	4783.42 ms	0.774	0.515	0.937	0.897	0.619
qwen2.5	0.5b	397 MB	Alibaba									0.713	0.626	2823.63 ms	0.701	0.55	1	0.861	0.605
lfm2.5-thinking	1.2b	731 MB	Liquid AI									0.879	0.63	10059.23 ms	0.704	0.551	0.887	0.94	0.629
granite3-moe	1.0b	821 MB	IBM									0.573	0.718	1026.26 ms	0.774	0.515	1	0.87	0.612
granite4	0.35b	708 MB	IBM									0.6	0.647	1978.59 ms	0.717	0.54	0.937	0.833	0.577
deepseek-r1	1.5b	1.1 GB	Deepseek									0.582	0.605	8756.96 ms	0.684	0.555	1	0.724	0.548
llama3.2	1.0b	1.3 GB	Meta									0.755	0.668	4783.42 ms	0.774	0.515	0.937	0.897	0.619
qwen2.5	0.5b	397 MB	Alibaba									0.713	0.626	2823.63 ms	0.701	0.55	1	0.861	0.605
lfm2.5-thinking	1.2b	731 MB	Liquid AI									0.879	0.63	10059.23 ms	0.704	0.551	0.887	0.94	0.629
granite3-moe	1.0b	821 MB	IBM									0.573	0.718	1026.26 ms	0.774	0.515	1	0.87	0.612
granite4	0.35b	708 MB	IBM									0.6	0.647	1978.59 ms	0.717	0.54	0.937	0.833	0.577
phi3:latest	3.8b	2.2GB	Microsoft									0.689	0.532	36283.27 ms	0.605	0.591	1	0.778	0.551
phi3:latest	3.8b	2.2GB	Microsoft									0.938	0.528	95002.14ms	0.623	0.585	1	0.854	0.614
gemma:2b	2b	1.7GB	Google									0.441	0.483	22385 ms	0.566	0.602	0.97	0.566	0.5
gemma:2b	2b	1.7GB	Google									0.75	0.428	8895.80 ms	0.504	0.617	1	0.914	0.555
gemma:2b	2b	1.7GB	Google									0.596	0.465	15655.96 ms	0.572	0.604	1	0.798	0.522
tinyllama:latest	1.1b	637MB	Open-Source									0.667	0.404	8254.44 ms	0.392	0.635	1	0.746	0.464
smollm2:360m	360m	726MB	Hugging Face									0.574	0.589	7121.49 ms	0.671	0.562	0.962	0.751	0.541
openchat:latest	7b	4.1GB	Open-Source									0.762	0.673	43021.38 ms	0.738	0.536	1	0.928	0.631
deepseek-r1	1.5b	1.1 GB	Deepseek									0.425	0.355	7459.19 ms	0.484	0.645	1	0.774	0.455
llama3.2	1.0b	1.3 GB	Meta									0.606	0.477	3791.97 ms	0.561	0.606	0.962	0.839	0.528
qwen2.5	0.5b	397 MB	Alibaba									0.436	0.45	1983.34 ms	0.559	0.62	1	0.721	0.481
lfm2.5-thinking	1.2b	731 MB	Liquid AI									0.826	0.458	10247.88 ms	0.566	0.635	0.94	0.929	0.576
granite3-moe	1.0b	821 MB	IBM									0.568	0.503	1404.17 ms	0.603	0.602	1	0.808	0.538
granite4	0.35b	708 MB	IBM									0.364	0.483	894.10 ms	0.566	0.605	1	0.729	0.455
deepseek-r1	1.5b	1.1 GB	Deepseek									0.778	0.641	12260.96 ms	0.713	0.542	0.963	0.808	0.604
llama3.2	1.0b	1.3 GB	Meta									0.809	0.641	4816.79 ms	0.713	0.542	1	0.874	0.623
qwen2.5	0.5b	397 MB	Alibaba									0.708	0.642	2538.21 ms	0.713	0.546	1	0.837	0.593
lfm2.5-thinking	1.2b	731 MB	Liquid AI									0.873	0.643	9693.49 ms	0.714	0.545	0.925	0.942	0.638
granite3-moe	1.0b	821 MB	IBM									0.787	0.688	1428.65 ms	0.751	0.526	0.963	0.867	0.638
granite4	0.35b	708 MB	IBM									0.832	0.654	1616.30 ms	0.723	0.538	0.963	0.855	0.634
deepseek-r1	1.5b	1.1 GB	Deepseek									0.95	0.374	16431.02 ms	0.499	0.636	1	0.892	0.581
llama3.2	1.0b	1.3 GB	Meta									0.967	0.439	1838.48 ms	0.551	0.615	1	0.941	0.618
qwen2.5	0.5b	397 MB	Alibaba									0.827	0.36	2000.8 ms	0.468	0.641	1	0.863	0.553
lfm2.5-thinking	1.2b	731 MB	Liquid AI									1	0.36	5152.04 ms	0.468	0.634	1	0.949	0.602
granite3-moe	1.0b	821 MB	IBM									0.85	0.431	605.60 ms	0.505	0.599	1	0.929	0.6
granite4	0.35b	708 MB	IBM									0.893	0.42	4799.06 ms	0.526	0.62	1	0.932	0.59
qwen3	0.6b	522 MB	Alibaba									0.917	0.385	8808.20 ms	0.508	0.632	1	0.9	0.58
lfm2	0.35b	229 MB	Liquid AI									0.917	0.448	1043.71 ms	0.558	0.611	1	0.895	0.608
gemma3	270m	291MB	Google									0.682	0.476	8626.64 ms	0.581	0.604	0.905	0.818	0.532
smollm2	360m	725MB	Hugging Face									0.582	0.425	9809.92 ms	0.54	0.622	1	0.676	0.49
qwen2	0.5b	352MB	Alibaba									0.52	0.443	6558.51 ms	0.554	0.612	1	0.585	0.47
gemma3	270m	291MB	Google									0.516	0.451	8225.74 ms	0.561	0.612	1	0.862	0.514
smollm2	360m	725MB	Hugging Face									0.369	0.416	9324.30 ms	0.513	0.63	1	0.69	0.444
qwen2	0.5b	352MB	Alibaba									0.316	0.434	7809.44 ms	0.527	0.621	1	0.699	0.44
gemma3	270m	291MB	Google									0.75	0.416	5250.86 ms	0.493	0.613	1	0.897	0.554
smollm2	360m	725MB	Hugging Face									0.733	0.385	8804.55 ms	0.448	0.633	1	0.758	0.513
qwen2	0.5b	325MB	Alibaba									0.9	0.393	7091.63 ms	0.494	0.629	1	0.864	0.571
gemma3	270m	291MB	Google									0.534	0.665	6071.43 ms	0.732	0.535	1	0.855	0.576
smollm2	360m	725MB	Hugging Face									0.69	0.625	7515.01 ms	0.7	0.554	1	0.712	0.574
qwen2	0.5b	325MB	Alibaba									0.516	0.575	6806.77 ms	0.66	0.573	0.962	0.752	0.525
gemma3	270m	291MB	Google									0.611	0.65	7550.54 ms	0.72	0.531	0.82	0.909	0.572
smollm2	360m	725MB	Hugging Face									0.579	0.643	9177.50 ms	0.714	0.545	0.78	0.807	0.537
qwen2	0.5b	352MB	Alibaba									0.626	0.639	6567.75 ms	0.711	0.544	0.76	0.826	0.547
gemma3	270m	291MB	Google									0.781	0.648	11655.83 ms	0.718	0.54	0.963	0.886	0.618
smollm2	360m	725MB	Hugging Face									0.784	0.654	10039.62 ms	0.724	0.541	0.963	0.805	0.609
qwen2	0.5b	352MB	Alibaba									0.748	0.64	7746.03 ms	0.712	0.545	0.963	0.818	0.6
gemma3	270m	291MB	Google									0.71	0.638	12647.83 ms	0.711	0.543	1	0.878	0.605
smollm2	360m	725MB	Hugging Face									0.601	0.647	10435.33 ms	0.717	0.543	1	0.772	0.57
qwen2	0.5b	325MB	Alibaba									0.568	0.551	10511.74 ms	0.641	0.574	0.95	0.821	0.537
gemma3	270m	291MB	Google									0.519	0.646	5712.99 ms	0.717	0.521	0.91	0.926	0.574
smollm2	360m	725MB	Hugging Face									0.592	0.508	8453.57 ms	0.606	0.591	0.94	0.755	0.519
qwen2	0.5b	325MB	Alibaba									0.481	0.56	4986.81 ms	0.648	0.574	0.91	0.715	0.502
qwen2.5-coder	0.5b	397MB	Alibaba									0.433	0.445	8108.00 ms	0.556	0.614	1	0.751	0.478
smollm2	135m	270MB	Hugging Face									0.398	0.432	5456.42 ms	0.527	0.619	0.924	0.653	0.439
bloom	560m	539MB	BigScience									0.266	0.272	18419.30 ms	0.397	0.684	0.962	0.252	0.31
qwen2.5-coder	0.5b	397MB	Alibaba									0.527	0.636	8409.09 ms	0.709	0.545	0.8	0.734	0.517
smollm2	135m	270MB	Hugging Face									0.575	0.613	5687.60 ms	0.69	0.554	0.82	0.789	0.533
bloom	560m	539MB	BigScience									0.295	0.252	20474.48 ms	0.402	0.694	0.924	0.226	0.303
qwen2.5-coder	0.5b	397MB	Alibaba									0.36	0.544	5690.57 ms	0.635	0.576	0.953	0.807	0.493
smollm2	135m	270MB	Hugging Face									0.786	0.602	9053,08 ms	0.681	0.556	0.963	0.809	0.595
bloom	560m	539MB	BigScience									0.269	0.318	40648.77 ms	0.454	0.659	1	0.201	0.324
qwen2.5-coder	0.5b	397MB	Alibaba									0.688	0.277	6618.07 ms	0.423	0.673	1	0.736	0.48
smollm2	135m	270MB	Hugging Face									0.768	0.523	5672.56 ms	0.619	0.584	1	0.722	0.564
bloom	560m	539MB	BigScience									0.448	0.382	7350.77 ms	0.506	0.637	1	0.237	0.386
qwen2.5-coder	0.5b	397MB	Alibaba									0.491	0.534	7744.31 ms	0.627	0.58	0.872	0.721	0.49
smollm2	135m	270MB	Hugging Face									0.637	0.554	6319.30 ms	0.643	0.574	0.932	0.649	0.524
bloom	560m	539MB	BigScience									0.185	0.121	11705.28 ms	0.277	0.732	0.902	0.198	0.235
stablelm-zephyr	3.0b	1.6 GB	Stability AI									0.607	0.614	2367.55 ms	0.691	0.553	0.962	0.79	0.566
minicpm5	1.0b	688 MB	Open BMB									0	-0.003	484.10 ms	0.158	0.722	1	0.497	0.258
llama3.2	1.0b	1.3 GB	Meta									0.671	0.607	2985.29 ms	0.686	0.557	0.97	0.803	0.578
phi3:latest	3.8b	2.2GB	Microsoft									0.739	0.645	3118.38 ms	0.716	0.544	0.924	0.806	0.596
falcon3	1.0b	1.8 GB	TII									0.731	0.593	3965.45 ms	0.674	0.564	1	0.79	0.587
lfm2.5-thinking	1.2b	731 MB	Liquid AI									0.898	0.591	16049.39 ms	0.672	0.578	1	0.926	0.636
qwen2.5	0.5b	397 MB	Alibaba									0.704	0.573	2303.93 ms	0.658	0.572	0.962	0.792	0.574
smollm2	360m	726MB	Hugging Face									0.681	0.64	1172.74 ms	0.712	0.546	1	0.652	0.578
bloom	560m	539MB	BigScience									0.362	0.127	5448.23 ms	0.302	0.73	1	0.258	0.301
gemma3	270m	291MB	Google									0.542	0.645	1364.59 ms	0.716	0.526	1	0.875	0.591
smollm	135m	91MB	Hugging Face									0.705	0.423	9621.05 ms	0.538	0.619	1	0.783	0.53
smollm	360m	229MB	Hugging Face									0.816	0.409	10452.41 ms	0.527	0.624	1	0.865	0.561
smollm2	135m	270MB	Hugging Face									0.727	0.479	4484.41 ms	0.583	0.603	0.905	0.729	0.53
gemma3	270m	291MB	Google									0.632	0.463	6675.74 ms	0.57	0.605	1	0.889	0.544
qwen2	0.5b	352MB	Alibaba									0.605	0.463	5868.24 ms	0.57	0.608	0.905	0.701	0.496
qwen2.5-coder	0.5b	397MB	Alibaba									0.57	0.431	7059.88 ms	0.545	0.616	1	0.604	0.479
bloom	560m	539MB	BigScience									0.739	0.33	26652.83 ms	0.464	0.662	1	0.328	0.441
TinyDolphin	1.1b	636MB										0.718	0.475	8454.34 ms	0.58	0.604	1	0.707	0.536
tinyllama:latest	1.1b	637MB	Open Source									0.596	0.492	8400.09 ms	0.594	0.598	1	0.732	0.52
smollm2	360m	726MB	Hugging Face									0.568	0.463	6345.59 ms	0.571	0.608	1	0.642	0.494
smollm	135m	91MB	Hugging Face									0.43	0.35	15875.32 ms	0.46	0.652	1	0.782	0.451
smollm	360m	229MB	Hugging Face									0.464	0.411	69788.21 ms	0.509	0.627	0.91	0.843	0.469
smollm2	135m	270MB	Hugging Face									0.421	0.456	5974.27 ms	0.545	0.611	1	0.693	0.468
gemma3	270m	291MB	Google									0.428	0.478	6102.84 ms	0.583	0.598	1	0.83	0.5
qwen2	0.5b	352MB	Alibaba									0.343	0.433	9009.10 ms	0.526	0.626	1	0.675	0.441
qwen2.5-coder	0.5b	397MB	Alibaba									0.364	0.413	6820.23 ms	0.511	0.625	1	0.745	0.452
bloom	560m	539MB	BigScience									0.303	0.161	31520.02 ms	0.309	0.709	0.97	0.286	0.292
TinyDolphin	1.1b	636MB										0.363	0.456	10002.72 ms	0.545	0.613	1	0.707	0.456
tinyllama:latest	1.1b	637MB	Open Source									0.437	0.484	8743.59 ms	0.568	0.603	1	0.78	0.491
smollm2	360m	726MB	Hugging Face									0.381	0.44	7019.16 ms	0.532	0.62	1	0.65	0.448`;

const lines = rawData.trim().split('\n');
console.log('Total raw lines:', lines.length);

const parsed = [];
for (let line of lines) {
  if (!line.trim()) continue;
  const parts = line.split('\t').map(p => p.trim());
  // The first 4 parts are name, params, size, lab
  const name = parts[0];
  const params = parts[1];
  const size = parts[2];
  const lab = parts[3] || 'Open Source';
  
  // Find the numeric values from the end
  // DRS is last, then reliability, safety, hallucination, factuality, latency, semantic, accuracy
  // Let's filter non-empty parts after lab
  const metricParts = parts.slice(4).filter(p => p.length > 0 && p !== '-0.644');
  // Usually metricParts has 8 elements: [accuracy, semantic, latency, factuality, hallucination, safety, reliability, drs]
  if (metricParts.length >= 8) {
    const drs = metricParts[metricParts.length - 1];
    const reliability = metricParts[metricParts.length - 2];
    const safety = metricParts[metricParts.length - 3];
    const hallucination = metricParts[metricParts.length - 4];
    const factuality = metricParts[metricParts.length - 5];
    const latency = metricParts[metricParts.length - 6];
    const semantic = metricParts[metricParts.length - 7];
    const accuracy = metricParts[metricParts.length - 8];
    
    parsed.push({
      name,
      params,
      size,
      lab,
      accuracy,
      semantic,
      latency,
      factuality,
      hallucination,
      safety,
      reliability,
      drs
    });
  } else {
    console.log('Could not parse line:', line, 'parts:', metricParts);
  }
}

console.log('Successfully parsed records:', parsed.length);
fs.writeFileSync('scratch/parsed_models.json', JSON.stringify(parsed, null, 2));
