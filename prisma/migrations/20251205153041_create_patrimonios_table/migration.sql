-- CreateTable
CREATE TABLE `Patrimonio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `numeroPatrimonio` INTEGER NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `localizacao` JSON NOT NULL,
    `observacao` VARCHAR(191) NULL,
    `status` ENUM('ATIVO', 'INATIVO', 'MANUTENCAO') NOT NULL,
    `responsavelId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Patrimonio` ADD CONSTRAINT `Patrimonio_responsavelId_fkey` FOREIGN KEY (`responsavelId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
