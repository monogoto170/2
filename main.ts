namespace motor {
    /**
     * 指定されたタイヤを回します。
     * @param side 左または右のタイヤを選択します。例: MotorSide.Left
     * @param speed 速度 (0-1023)。0は停止、1023は最大速度。例: 512
     */
    //% block="タイヤ %side を回す 速さ %speed" // ブロックの表示名と引数
    //% speed.min=0 speed.max=1023 speed.defl=512 // 速度引数の範囲とデフォルト値
    //% expandableArgumentMode="toggle" // ドロップダウンリストを切り替え可能にする
    export function driveMotor(side: MotorSide, speed: number) {
        if (side == MotorSide.Left) {
            pins.analogWritePin(AnalogPin.P13, speed);
        } else {
            pins.analogWritePin(AnalogPin.P15, speed);
        }
    }

    /**
     * モーターの選択肢
     */
    export enum MotorSide {
        //% block="左"
        Left = 0,
        //% block="右"
        Right = 1
    }
}
