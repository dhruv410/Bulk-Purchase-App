ddna = input()
ddna = ddna.lower()
# dna = ddna[::-1]
dna = []
for i in range (0,len(ddna)):
    dna.append(ddna[len(ddna)-1-i])

# list_dna = [ dna[i] for i in range(0,len(dna))]
# list_rna = ['a' if dna[i] == 't' else 'u' if dna[i] == 'a' else 'c' if dna[i] == 'g' else 'g' if dna[i] == 'c' else 'a' for i in range(0,len(list_dna))]
rna = []
flag = False
for i in range(0,len(dna)):
    if dna[i]=='a':
        rna.append('u')
    elif dna[i]=='t':
        rna.append('a')
    elif dna[i]=='g':
        rna.append('c')
    else:
        rna.append('g')

dic = {'UUU': 'F', 'UUC': 'F', 'UUA': 'L', 'UUG': 'L', 'UCU': 'S', 'UCC': 'S'
        , 'UCA': 'S', 'UCG': 'S', 'UAU': 'Y', 'UAC': 'Y', 'UAA': '*', 'UAG': '*'
        , 'UGU': 'C', 'UGC': 'C', 'UGA': '*', 'UGG': 'W', 'CUU': 'L', 'CUC': 'L'
        , 'CUA': 'L', 'CUG': 'L', 'CCU': 'P', 'CCC': 'P', 'CCA': 'P', 'CCG': 'P'
        , 'CAU': 'H', 'CAC': 'H', 'CAA': 'Q', 'CAG': 'Q', 'CGU': 'R', 'CGC': 'R'
        , 'CGA': 'R', 'CGG': 'R', 'AUU': 'I', 'AUC': 'I', 'AUA': 'I', 'AUG': 'M'
        , 'ACU': 'T', 'ACC': 'T', 'ACA': 'T', 'ACG': 'T', 'AAU': 'N', 'AAC': 'N'
        , 'AAA': 'K', 'AAG': 'K', 'AGU': 'S', 'AGC': 'S', 'AGA': 'R', 'AGG': 'R'
        , 'GUU': 'V', 'GUC': 'V', 'GUA': 'V', 'GUG': 'V', 'GCU': 'A', 'GCC': 'A'
        , 'GCA': 'A', 'GCG': 'A', 'GAU': 'D', 'GAC': 'D', 'GAA': 'E', 'GAG': 'E'
        , 'GGU': 'G', 'GGC': 'G', 'GGA': 'G', 'GGG': 'G'}
to_protein = {
    
    'uac' : 'tyr',
    'uau' : 'tyr',
    'uaa' : '----',
    'uag' : '----',

    'ucu' : 'Ser',
    'ucc' : 'Ser',
    'uca' : 'Ser',
    'ucg' : 'Ser',

    'uuu' : 'phe',
    'uuc' : 'phe',
    'uua' : 'Leu',
    'uug' : 'Leu',

    'cuu' : 'leu',
    'cuc' : 'leu',
    'cua' : 'leu',
    'cug' : 'leu',

    'ugu' : 'cys',
    'ugc' : 'cys',
    'uga' : '----',
    'ugg' : 'trp',


    'ccu' : 'pro',
    'ccc' : 'pro',
    'cca' : 'pro',
    'ccg' : 'pro',

    'cgu' : 'arg',
    'cgc' : 'arg',
    'cga' : 'arg',
    'cgg' : 'arg',

    'cau' : 'his',
    'cac' : 'his',
    'caa' : 'gln',
    'cag' : 'gln',


    'auu' : 'ile',
    'auc' : 'ile',
    'aua' : 'ile',
    'aug' : 'met',

    'acu' : 'thr',
    'acc' : 'thr',
    'aca' : 'thr',
    'acg' : 'thr',

    'aau' : 'asn',
    'aac' : 'asn',
    'aaa' : 'lys',
    'aag' : 'lys',


    'agu' : 'ser',
    'agc' : 'ser',
    'aga' : 'arg',
    'agg' : 'arg',


    'guu' : 'val',
    'guc' : 'val',
    'gua' : 'val',
    'gug' : 'val',


    'gcu' : 'ala',
    'gcc' : 'ala',
    'gca' : 'ala',
    'gcg' : 'ala',


    'gau' : 'asp',
    'gac' : 'asp',
    'gaa' : 'glu',
    'gag' : 'glu',


    'ggu' : 'gly',
    'ggc' : 'gly',
    'gga' : 'gly',
    'ggg' : 'gly',
}
a = []
for i in range(0,len(rna)):
    print(rna[i],end='')
print()

lenr = len(rna)
i = 0
while ( i < lenr):
    if flag == False:
        if i < lenr-2 and  rna[i] == 'a' and rna[i+1] == 'u' and rna[i+2] == 'g':
            flag = True
            i += 3
        else:
            i += 1
    elif flag == True:
        if i < lenr-2 and  rna[i] == 'u' and ((rna[i+1] == 'a' and (rna[i+2] == 'a' or rna[i+2] == 'g')) or ( rna[i+1] == 'g' and rna[i+2]== 'a')):
            flag = False
            print("Protein Start: ",end='')
            for j in range(0,len(a)):
                print(a[j],end=' ')
            a = []
            print(":Protein End")
            i += 3
        elif i < lenr -2:
            a.append(to_protein[rna[i]+rna[i+1]+rna[i+2]])
            i += 3
        else:
            break;